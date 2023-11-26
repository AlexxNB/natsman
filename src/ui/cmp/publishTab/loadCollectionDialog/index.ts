import { box, list } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { appScreen } from '#ui/screen';
import { backdrop } from '#ui/backdrop';
import { collectionList } from './collectionList';
import { titleInput } from './titleInput';
import { cancelButton } from './cancelButton';
import { loadButton } from './loadButton';
import { deleteButton } from './deleteButton';
import { configStore } from '#stores/config';
import { publish } from '#stores/publish';
import logger from '#lib/logger';


const loadCollectionBox = box({
  label: 'Load collection item',
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
loadCollectionBox.append(cancelButton);

loadButton.right = 9;
loadButton.bottom = 0;
loadCollectionBox.append(loadButton);

deleteButton.left = 1;
deleteButton.bottom = 0;
loadCollectionBox.append(deleteButton);

loadCollectionBox.append(collectionList);

loadButton.on('press', () => {
  const { subject, payload } = configStore.$.collection.saved[collectionList.selected];
  publish.$.subject = subject;
  publish.$.payload = payload;
  hideDiaolog();
});

deleteButton.on('press', () => {
  configStore.$.collection.saved = configStore.$.collection.saved.filter((_,i) => i !== collectionList.selected);
  hideDiaolog();
});

cancelButton.on('press', () => {
  hideDiaolog();
});


function hideDiaolog() {
  backdrop.hide();
  loadCollectionBox.destroy();
}

export const loadCollectionDialog = {
  show() {
    backdrop.show();
    appScreen.append(loadCollectionBox);
    collectionList.setItems(configStore.$.collection.saved.map((item) => item.title));
    collectionList.selected = 0;
  }
}
