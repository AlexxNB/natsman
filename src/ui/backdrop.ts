import { box } from 'neo-blessed';
import { bgColor } from '#ui/styles';
import { appScreen } from '#ui/screen';

const backdropBox = box({
  width: '100%',
  height: '100%',
});

export const backdrop = {
  show() {
    appScreen.append(backdropBox)
  },
  hide() {
    backdropBox.detach();
  },
}