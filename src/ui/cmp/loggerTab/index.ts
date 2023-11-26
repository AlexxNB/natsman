import { box, log } from 'neo-blessed';
import { borderFgColor, fgColor, scrollbarBgColor } from '#ui/styles';
import eventbus from '#lib/eventbus';

export const loggerTab = log({
  label: 'Logger',
  keys: true,
  mouse: true,
  scrollbar: {
    style: {
      bg: scrollbarBgColor,
    }
  },
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

eventbus.on('logger:add', (value) => {
 // console.log(new Date().getTime());
  loggerTab.add(value);
});