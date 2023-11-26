import { box, form } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { appScreen } from '#ui/screen';
import { backdrop } from '#ui/backdrop';
import { titleInput } from './titleInput';
import { cancelButton } from './cancelButton';
import { saveButton } from './saveButton';
import { configStore } from '#stores/config';
import { randomUUID } from 'crypto';


const saveServerBox = box({
  label: 'Save server configuration',
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

saveServerBox.append(titleInput);
saveServerBox.append(saveButton);
saveServerBox.append(cancelButton);

saveButton.on('press', () => {
  configStore.$.server.saved.push({
    id: randomUUID(),
    title: titleInput.value,
    ...configStore.$.server.current,
  })
  hideDiaolog();
});

cancelButton.on('press', () => {
  hideDiaolog();
});

titleInput.on('keypress', (_,{name}) => {
  (name === 'backspace' && titleInput.value.length === 1)
    ? saveButton.hide()
    : saveButton.show();
});

function hideDiaolog() {
  backdrop.hide();
  titleInput.setValue('');
  saveButton.hide();
  saveServerBox.destroy();
}

export const saveServerDialog = {
  show() {
    backdrop.show();
    appScreen.append(saveServerBox);
    titleInput.focus();
  }
}