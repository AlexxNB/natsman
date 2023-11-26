import { list } from 'neo-blessed';
import { borderFgColor, fgColor, scrollbarBgColor, listFgColorSelected, listBgColorSelected } from '#ui/styles';


export const serverList = list({
  width: '100%-2',
  height: 8,
  mouse: true,
  scrollable:true,
  keys: true,
  scrollbar: {
    style: {
      bg: scrollbarBgColor,
    }
  },
  style: {
    fg: fgColor,
    border: {
      fg: borderFgColor
    },
    selected: {
      fg: listFgColorSelected,
      bg: listBgColorSelected,
    }
  },
});
