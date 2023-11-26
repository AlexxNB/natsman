import { form } from 'neo-blessed';
import { configStore } from '#stores/config';
import { appScreen } from '#ui/screen';
import { hostInput } from './hostInput';
import { portInput } from './portInput';
import { tokenInput } from './tokenInput';
import { saveButton } from './saveButton';
import { loadButton } from './loadButton';
import { connectButton } from './connectButton';


export const connectionForm = form({
  keys: true,
});

portInput.left = 20;
tokenInput.left = 28;
saveButton.left = 63;
loadButton.left = 71;
connectButton.right = 1;

connectionForm.append(hostInput);
connectionForm.append(portInput);
connectionForm.append(tokenInput);
connectionForm.append(saveButton);
connectionForm.append(loadButton);
connectionForm.append(connectButton);

configStore.$$((data) => {
  hostInput.setValue(data.server.current.host);
  portInput.setValue(String(data.server.current.port));
  tokenInput.setValue(data.server.current.token);
  appScreen.render();
});
