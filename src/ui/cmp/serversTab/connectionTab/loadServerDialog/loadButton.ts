import { box, button } from 'neo-blessed';
import { buttonFgColor, buttonBgColorHover } from '#ui/styles';

export const loadButton = button({
  content: 'Load selected',
  mouse: true,
  width: 15,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColor,
    hover: {
      bg: buttonBgColorHover,
    },
  },
});
