import { box } from 'neo-blessed';
import { disconnectButton } from './disconnectButton';
import { configStore } from '#stores/config';

export const connectedTab = box({
  top: 1,
  left: 1,
  tags: true,
});

disconnectButton.right = 1;

connectedTab.on('prerender', () => {
  connectedTab.setContent(`{bold}Connected to server:{/bold} ${configStore.$.server.current.host}:${configStore.$.server.current.port}`);
});

connectedTab.append(disconnectButton);