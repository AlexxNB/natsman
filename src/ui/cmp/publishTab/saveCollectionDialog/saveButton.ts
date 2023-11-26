import { box, button } from 'neo-blessed';
import { buttonFgColor, buttonBgColorHover } from '#ui/styles';

export const saveButton = button({
  content: 'Save',
  mouse: true,
  width: 8,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColor,
    hover: {
      bg: buttonBgColorHover,
    },
  },
});
