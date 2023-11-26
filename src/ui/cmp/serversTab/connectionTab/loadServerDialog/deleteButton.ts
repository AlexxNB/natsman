import { button } from 'neo-blessed';
import { buttonFgColorAction, buttonBgColorHover } from '#ui/styles';

export const deleteButton = button({
  content: 'Delete',
  mouse: true,
  width: 8,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColorAction,
    hover: {
      bg: buttonBgColorHover,
    },
  },
});
