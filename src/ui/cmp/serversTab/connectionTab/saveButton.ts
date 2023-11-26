import { box, button } from 'neo-blessed';
import { buttonFgColor, buttonBgColorHover } from '#ui/styles';
import logger from '#lib/logger';
import { saveServerDialog } from './saveServerDialog';

export const saveButton = button({
  content: 'Save',
  mouse: true,
  width: 8,
  top: 1,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColor,
    hover: {
      bg: buttonBgColorHover,
    },
    focus: {
      bg: buttonBgColorHover,
    },
  },
});

saveButton.on('press', () => {
  saveServerDialog.show();
});
