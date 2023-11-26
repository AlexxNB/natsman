import { box, button } from 'neo-blessed';
import { buttonFgColor, buttonBgColorHover } from '#ui/styles';
import logger from '#lib/logger';
import { loadServerDialog } from './loadServerDialog';

export const loadButton = button({
  content: 'Load',
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

loadButton.on('press', () => {
  loadServerDialog.show();
});
