import { box, list } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { appScreen } from '#ui/screen';
import { backdrop } from '#ui/backdrop';
import { serverList } from './serverList';
import { titleInput } from './titleInput';
import { cancelButton } from './cancelButton';
import { loadButton } from './loadButton';
import { deleteButton } from './deleteButton';
import { configStore } from '#stores/config';
import logger from '#lib/logger';


const loadServerBox = box({
  label: 'Load server configuration',
  width: 50,
  height: 12,
  left: 'center',
  top: 'center',
  border: {
    type: 'line',
  },
  style: {
    fg: fgColor,
    border: {
      fg: borderFgColor
    },
    scrollbar: {
      bg: 'blue',
      fg: 'red',
    },
  },
});

cancelButton.right = 1;
cancelButton.bottom = 0;
loadServerBox.append(cancelButton);

loadButton.right = 9;
loadButton.bottom = 0;
loadServerBox.append(loadButton);

deleteButton.left = 1;
deleteButton.bottom = 0;
loadServerBox.append(deleteButton);

loadServerBox.append(serverList);

loadButton.on('press', () => {
  const { host, port, token } = configStore.$.server.saved[serverList.selected];
  configStore.$.server.current = {
    host,
    port,
    token,
  };
  hideDiaolog();
});

deleteButton.on('press', () => {
  configStore.$.server.saved = configStore.$.server.saved.filter((_,i) => i !== serverList.selected);
  hideDiaolog();
});

cancelButton.on('press', () => {
  hideDiaolog();
});


function hideDiaolog() {
  backdrop.hide();
  loadServerBox.destroy();
}

export const loadServerDialog = {
  show() {
    backdrop.show();
    appScreen.append(loadServerBox);
    serverList.setItems(configStore.$.server.saved.map((item) => item.title));
    serverList.selected = 0;
  }
}
