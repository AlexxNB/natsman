import { button } from 'neo-blessed';
import { buttonFgColorAction, buttonBgColorHover } from '#ui/styles';
import nats from '#lib/nats';

export const disconnectButton = button({
  content: 'Disconnect',
  mouse: true,
  width: 12,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColorAction,
    hover: {
      bg: buttonBgColorHover,
    },
  },
});

disconnectButton.on('press', async () => {
  await nats.disconnect();
});
