import { appScreen } from './ui/screen';
import { serversTab } from './ui/cmp/serversTab';
import { subjectsTab } from './ui/cmp/subjectsTab';
import { messagesTab } from './ui/cmp/messagesTab';
import { publishTab } from './ui/cmp/publishTab';
import { loggerTab } from './ui/cmp/loggerTab';

/** Server pane */
serversTab.top = 0;
serversTab.left = 0;
serversTab.width = '100%';
serversTab.height = 5;
appScreen.append(serversTab);

/** subjectsTab pane */
subjectsTab.left = 0;
subjectsTab.top = 5;
subjectsTab.width = 40;
subjectsTab.height = `100%-${serversTab.height}`;
appScreen.append(subjectsTab);

/** Logger pane */
loggerTab.left = subjectsTab.width;
loggerTab.bottom = 0;
loggerTab.width = `100%-${subjectsTab.width}`;
loggerTab.height = 7;
appScreen.append(loggerTab);

/** messagesTab pane */
messagesTab.left = subjectsTab.width;
messagesTab.top = 5;
messagesTab.bottom = loggerTab.height;
messagesTab.right = 50;
appScreen.append(messagesTab);

/** messagesTab pane */
publishTab.width = 50;
publishTab.top = 5;
publishTab.bottom = loggerTab.height;
publishTab.right = 0;
appScreen.append(publishTab);

/** Render the app */
appScreen.render();
