import { box } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { natsConnected } from '#stores/nats';
import { connectionForm } from './connectionTab';
import { connectedTab } from './connectedTab';
import logger from '#lib/logger';


export const serversTab = box({
  label: 'Server Connection',
  keys: true,
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

connectionForm.hide();
connectedTab.hide();

serversTab.append(connectionForm);
serversTab.append(connectedTab);

natsConnected.$$((connected) => {
  if (connected) {
    connectionForm.hide();
    connectedTab.show();
  } else {
    connectedTab.hide();
    connectionForm.show();
  }
});

