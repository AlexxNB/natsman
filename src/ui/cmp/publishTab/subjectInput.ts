import { textbox } from 'neo-blessed';
import { inputBorderFgColor, inputBorderFgColorHover, inputBorderFgColorFocus } from '#ui/styles';
import { onInputValueChange } from '#lib/helpers';
import { publish } from '#stores/publish';
import logger from '#lib/logger';

export const subjectInput = textbox({
  label: 'Subject',
  height: 3,
  border: {
    type: 'line'
  },
  style: {
    border: {
      fg: inputBorderFgColor,
    },
    hover: {
      border: {
        fg: inputBorderFgColorHover,
      }
    },
    focus: {
      border: {
        fg: inputBorderFgColorFocus,
      }
    },
  },
});

subjectInput.on('focus', (...args) => {
  subjectInput.readInput();
});

onInputValueChange(subjectInput, (value) => {
  publish.$.subject = value;
});
