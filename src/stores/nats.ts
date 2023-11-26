import { store, StorxyStore } from 'storxy';
import eventbus from '#lib/eventbus';

export type NatsIncomingPacket = {
  headers?:object;
  reply?:string;
  payload:string;
  timestamp?:number;
}

type NatsIncoming = {
  addPacket?: (subject:string, packet:NatsIncomingPacket) => void;
  listSubjects?: () => string[]
} & StorxyStore<Record<string,StorxyStore<NatsIncomingPacket[]>>>


export const natsConnected = store(false);

export const natsIncoming:NatsIncoming = store({});
natsIncoming.addPacket = (subject, packet) => {
  if (!natsIncoming.$[subject]) {
    eventbus.emit('nats:subject:add', subject);
    natsIncoming.$[subject] =  store([]);
  }
  const subjectStore = natsIncoming.$[subject];
  const storePacket = {
    ...packet,
    timestamp: packet.timestamp || ~~(new Date().getTime() / 1000)
  };
  subjectStore.$.push(storePacket);
  eventbus.emit('nats:message:add', {
    subject,
    packet: storePacket,
    type: 'publish',
  });
}
natsIncoming.listSubjects = () => {
  return Object.keys(natsIncoming.$);
}

export const natsResponseIncoming:NatsIncoming = store({});
natsResponseIncoming.addPacket = (subject, packet) => {
  if (!natsResponseIncoming.$[subject]) {
    eventbus.emit('nats:response:add', subject);
    natsResponseIncoming.$[subject] =  store([]);
  }
  const subjectStore = natsResponseIncoming.$[subject];
  const storePacket = {
    ...packet,
    timestamp: packet.timestamp || ~~(new Date().getTime() / 1000)
  };
  subjectStore.$.push(storePacket);
  eventbus.emit('nats:message:add', {
    subject,
    packet: storePacket,
    type: 'response',
  });
}
