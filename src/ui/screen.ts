import { screen } from 'neo-blessed';

export const appScreen = screen({
  smartCSR: true,
});

appScreen.title = 'Natsman';

appScreen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
