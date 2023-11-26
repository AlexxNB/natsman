import { log } from 'neo-blessed';
import { borderFgColor, fgColor, scrollbarBgColor } from '#ui/styles';
import { natsIncoming, natsResponseIncoming, NatsIncomingPacket } from '#stores/nats';
import eventbus from '#lib/eventbus';
import dayjs from 'dayjs';
import jsonColorizer from 'json-colorizer';
import logger from '#lib/logger';

export const messagesTab = log({
  label: 'Messages',
  mouse: true,
  tags:true,
  scrollbar: {
    style: {
      bg: scrollbarBgColor,
    }
  },
  border: {
    type: 'line',
  },
  style: {
    fg: fgColor,
    border: {
      fg: borderFgColor
    },
  },
});

const currentView = {
  type: null,
  subject: null,
};

eventbus.on('app:subject:selected', (subject) => {
  messagesTab.setContent('');
  currentView.type = 'publish';
  currentView.subject = subject;
  if (subject) {
    messagesTab.setLabel(`Messages: ${subject}`);
    const list = natsIncoming.$[subject]?.$;
    if (list) {
      messagesTab.setContent(list.map((packet) => createMessage(packet)).join('\n'));
    }
  } else {  
    messagesTab.setLabel('Messages');
    messagesTab.setContent('Choose subject to see messages...');
  }
});


eventbus.on('nats:request:sent', (subject) => {
  messagesTab.setContent('');
  currentView.type = 'response';
  currentView.subject = subject;
  if (subject) {
    messagesTab.setLabel(`Response on: ${subject}`);
    const list = natsResponseIncoming.$[subject]?.$;
    if (list) {
      messagesTab.setContent(list.map((packet) => createMessage(packet)).join('\n'));
    }
  }
});

eventbus.on('nats:message:add', ({subject, packet, type}) => {
  if (subject === currentView.subject && type === currentView.type) {
    messagesTab.add(createMessage(packet));
  }
});

function createMessage(packet:NatsIncomingPacket) {
  const date = dayjs.unix(packet.timestamp).format('YYYY-MM-DD HH:mm:ss');
  let message;
  try {
    message = jsonColorizer(JSON.stringify(JSON.parse(packet.payload),null,'  '));
  } catch {
    message = packet.payload;
  }
  return `{bold}Time:{/bold} ${date}\n{bold}Payload:{/bold}\n${message}\n`;
}
