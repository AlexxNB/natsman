import { list } from 'neo-blessed';
import { borderFgColor, fgColor, scrollbarBgColor, listFgColorSelected, listBgColorSelected } from '#ui/styles';
import eventbus from '#lib/eventbus';
import { natsIncoming } from '#stores/nats';
import logger from '#lib/logger';

export const subjectsList = list({
  width: '100%-2',
  height: '100%-2',
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

subjectsList.on('select', () => {
  eventbus.emit('app:subject:selected', subjectsList.value);
});

natsIncoming.$$((list) => {
  subjectsList.setItems(Object.keys(list));
});