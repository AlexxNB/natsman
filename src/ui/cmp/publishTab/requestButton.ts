import { button } from 'neo-blessed';
import { buttonFgColorAction, buttonBgColorHover } from '#ui/styles';
import logger from '#lib/logger';
import nats from '#lib/nats';
import eventbus from '#lib/eventbus';
import { publish } from '#stores/publish';
import { natsResponseIncoming } from '#stores/nats';

export const requestButton = button({
  content: 'Request',
  mouse: true,
  width: 9,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColorAction,
    hover: {
      bg: buttonBgColorHover,
    },
    focus: {
      bg: buttonBgColorHover,
    },
  },
});

requestButton.on('press', async () => {
  const subject = publish.$.subject;
  try {
    eventbus.emit('nats:request:sent', subject);
    const payload = await nats.request(subject, publish.$.payload);
    natsResponseIncoming.addPacket(subject, {
      payload,
    });
  } catch {
    logger(`No response for request on '${subject}'`);
  }
  
});
// students.v1.get {"personalCode":"2133DE020772"}