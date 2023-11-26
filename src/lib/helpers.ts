export function onInputValueChange(inputWidget, callback) {
  inputWidget.on('keypress', (char, { name }) => {
    const value = (name === 'backspace')
      ? inputWidget.value.slice(0,-1)
      : `${inputWidget.value}${char}`;

    callback(value);
  });
}