import { box } from 'neo-blessed';
import { borderFgColor, fgColor } from '#ui/styles';
import { publish } from '#stores/publish';
import { natsConnected } from '#stores/nats';
import { subjectInput } from './subjectInput';
import { payloadInput } from './payloadInput';
import { publishButton } from './publishButton';
import { requestButton } from './requestButton';
import { saveButton } from './saveButton';
import { loadButton } from './loadButton';

export const publishTab = box({
  label: 'Publish message',
  border: {
    type: 'line',
  },
  style: {
    fg: fgColor,
    border: {
      fg: borderFgColor
    },
  },
});

subjectInput.top = 0;
publishTab.append(subjectInput);

payloadInput.top = subjectInput.height;
payloadInput.bottom = 1;
publishTab.append(payloadInput);

requestButton.bottom = 0;
requestButton.right = 0;
publishTab.append(requestButton);

publishButton.bottom = 0;
publishButton.right = requestButton.width;
publishTab.append(publishButton);

saveButton.bottom = 0;
saveButton.left = 0;
publishTab.append(saveButton);

loadButton.bottom = 0;
loadButton.left = saveButton.width;
publishTab.append(loadButton);

publish.$$(() => {
  subjectInput.setValue(publish.$.subject);
  payloadInput.setValue(publish.$.payload);
  togglePublishButtons();
}, true);
natsConnected.$$(togglePublishButtons);

function togglePublishButtons() {
  if (publish.$.subject.length && natsConnected.$) {
    publishButton.show();
    requestButton.show();
  } else {
    publishButton.hide();
    requestButton.hide();
  }
}