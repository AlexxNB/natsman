import { textbox } from 'neo-blessed';
import { inputBorderFgColor, inputBorderFgColorHover, inputBorderFgColorFocus } from '#ui/styles';
import { configStore } from '#stores/config';

export const hostInput = textbox({
  label: 'Host',
  width: 20,
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

hostInput.on('focus', (...args) => {
  hostInput.readInput();
});

hostInput.on('blur', () => {
  configStore.$.server.current.host = hostInput.value;
});

