import { box, form } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { appScreen } from '#ui/screen';
import { backdrop } from '#ui/backdrop';
import { titleInput } from './titleInput';
import { cancelButton } from './cancelButton';
import { saveButton } from './saveButton';
import { configStore } from '#stores/config';
import { publish } from '#stores/publish';
import { randomUUID } from 'crypto';
import { onInputValueChange } from '#lib/helpers';


const saveCollectionBox = box({
  label: 'Save message to the collection',
  width: Number(titleInput.width) + 6,
  height: 7,
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
  },
});

cancelButton.right = 1;
cancelButton.bottom = 0;
saveButton.right = Number(cancelButton.width) + 1;
saveButton.bottom = 0;

saveButton.hide();

saveCollectionBox.append(titleInput);
saveCollectionBox.append(saveButton);
saveCollectionBox.append(cancelButton);

saveButton.on('press', () => {
  configStore.$.collection.saved.push({
    id: randomUUID(),
    title: titleInput.value,
    ...publish.$,
  });
  hideDiaolog();
});

cancelButton.on('press', () => {
  hideDiaolog();
});

onInputValueChange(titleInput, (value) => {
  if (value?.length) {
    saveButton.show();
  } else {
    saveButton.hide();
  }
});

function hideDiaolog() {
  backdrop.hide();
  titleInput.setValue('');
  saveButton.hide();
  saveCollectionBox.destroy();
}

export const saveCollectionDialog = {
  show() {
    backdrop.show();
    appScreen.append(saveCollectionBox);
    titleInput.focus();
  }
}