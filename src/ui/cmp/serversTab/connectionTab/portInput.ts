import { textbox } from 'neo-blessed';
import { inputBorderFgColor, inputBorderFgColorHover, inputBorderFgColorFocus } from '#ui/styles';
import { configStore } from '#stores/config';

export const portInput = textbox({
  label: 'Port',
  width: 8,
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

portInput.on('focus', (...args) => {
  portInput.readInput();
});

portInput.on('blur', () => {
  configStore.$.server.current.port = Number(portInput.value) || 4222;
});