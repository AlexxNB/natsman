import { textbox } from 'neo-blessed';
import { inputBorderFgColor, inputBorderFgColorHover, inputBorderFgColorFocus } from '#ui/styles';

export const titleInput = textbox({
  label: 'Collection item title',
  left: 'center',
  keyable: true,
  width: 40,
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

titleInput.on('focus', (...args) => {
  titleInput.readInput();
});


