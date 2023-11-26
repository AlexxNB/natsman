import { box, button } from 'neo-blessed';
import { buttonFgColorSecondary, buttonBgColorHover } from '#ui/styles';

export const cancelButton = button({
  content: 'Cancel',
  mouse: true,
  width: 8,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColorSecondary,
    hover: {
      bg: buttonBgColorHover,
    },
  },
});
