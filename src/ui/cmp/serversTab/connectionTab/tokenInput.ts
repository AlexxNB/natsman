import { textbox } from 'neo-blessed';
import { inputBorderFgColor, inputBorderFgColorHover, inputBorderFgColorFocus } from '#ui/styles';
import { configStore } from '#stores/config';

export const tokenInput = textbox({
  label: 'Token',
  width: 34,
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

tokenInput.on('focus', () => {
  tokenInput.readInput();
});

tokenInput.on('blur', () => {
  configStore.$.server.current.token = tokenInput.value
});
