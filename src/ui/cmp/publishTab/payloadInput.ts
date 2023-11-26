import { textarea } from 'neo-blessed';
import { onInputValueChange } from '#lib/helpers';
import { inputBorderFgColor, inputBorderFgColorHover, inputBorderFgColorFocus } from '#ui/styles';
import { publish } from '#stores/publish';

export const payloadInput = textarea({
  label: 'Payload',
  mouse: true,
  keys: true,
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

payloadInput.on('focus', (...args) => {
  payloadInput.readInput();
});

onInputValueChange(payloadInput, (value) => {
  publish.$.payload = value;
});

