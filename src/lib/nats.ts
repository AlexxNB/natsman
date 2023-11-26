import { connect, StringCodec, Empty, NatsConnection, Subscription } from 'nats';
import { onSignalExit } from '#lib/system';
import { Server } from '#types/common';
import logger from '#lib/logger';
import { natsConnected, natsIncoming } from '#stores/nats';

const codec = StringCodec();

class NatsGateway {
  #conn:NatsConnection;
  #subscription:Subscription;

  async connect(config:Server) {
    const server = `${config.host || 'localhost'}:${config.port || 4222}`;
    logger(`Connecting to NATS server: ${server}`);
    try {
      this.#conn = await connect({
        servers: server,
        token: config.token || undefined,
        reconnectTimeWait: 60 * 1000,
        reconnectJitter: 10 * 1000,
        maxReconnectAttempts: -1,
      });
      natsConnected.$ = true;
      logger(`Connected`);
      this.#subscribeIncoming();
    } catch (err) {
      this.#conn = undefined;
      natsConnected.$ = false;
      logger(`Failed to connect: ${err.message}`);
    }
  }

  async disconnect() {
    if (this.#conn) {
      logger(`Disconnecting from server...`);
      await this.#conn?.drain();
      await this.#conn?.close();
      this.#conn = undefined;
      this.#subscription = undefined;
      logger(`Disconnected...`);
    }
    natsConnected.$ = false;
    natsIncoming.$ = {};
  }

  async publish(subject, payload, options?) {
    await this.#conn.publish(
      subject,
      (payload && codec.encode(payload)) || Empty,
      options,
    );
  }

  async request(subject, payload, options?) {
    const response = await this.#conn.request(
      subject,
      (payload && codec.encode(payload)) || Empty,
      {
        timeout: 5 * 1000,
        ...options,
      },
    );
    return codec.decode(response.data);
  }

  async #subscribeIncoming() {
    this.#subscription = this.#conn.subscribe('>');
    logger(`Subscribed for subject '${this.#subscription.getSubject()}'`);
    for await (const incoming of this.#subscription) {
      if (!incoming.subject.startsWith('_INBOX.')) {
        logger(`Publication in subject '${incoming.subject}'`);
        natsIncoming.addPacket(incoming.subject, {
          payload: codec.decode(incoming.data),
          headers: incoming.headers,
          reply: incoming.reply,
        });
      }
    }
  }
}

export default new NatsGateway();