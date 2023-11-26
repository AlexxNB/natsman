import { button } from 'neo-blessed';
import { buttonFgColorAction, buttonBgColorHover } from '#ui/styles';
import { configStore } from '#stores/config';
import nats from '#lib/nats';
import { publish } from '#stores/publish';

export const publishButton = button({
  content: 'Publish',
  mouse: true,
  width: 9,
  height: 1,
  align: 'center',
  style: {
    fg: buttonFgColorAction,
    hover: {
      bg: buttonBgColorHover,
    },
    focus: {
      bg: buttonBgColorHover,
    },
  },
});

publishButton.on('press', async () => {
  await nats.publish(publish.$.subject, publish.$.payload);
});
