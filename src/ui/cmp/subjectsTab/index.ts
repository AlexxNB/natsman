import { box } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { subjectsList } from './subjectsList';
import eventbus from '#lib/eventbus';

export const subjectsTab = box({
  label: 'Subjects',
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

subjectsTab.append(subjectsList);
