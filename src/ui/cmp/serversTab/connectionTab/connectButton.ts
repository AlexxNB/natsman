import { button } from 'neo-blessed';
import { buttonFgColor, buttonBgColorHover } from '#ui/styles';
import { configStore } from '#stores/config';
import nats from '#lib/nats';

export const connectButton = button({
  content: 'Connect',
  mouse: true,
  width: 9,
  top: 1,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColor,
    hover: {
      bg: buttonBgColorHover,
    },
    focus: {
      bg: buttonBgColorHover,
    },
  },
});

connectButton.on('press', async () => {
  await nats.connect(configStore.$.server.current);
});
