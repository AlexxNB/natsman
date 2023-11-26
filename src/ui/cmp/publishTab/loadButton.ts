import { box, button } from 'neo-blessed';
import { buttonFgColor, buttonBgColorHover } from '#ui/styles';
import logger from '#lib/logger';
import { loadCollectionDialog } from './loadCollectionDialog';

export const loadButton = button({
  content: 'Load',
  mouse: true,
  width: 6,
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
  loadCollectionDialog.show();
});
