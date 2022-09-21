# Azure Notification Hubs SDK for Web Push

## Subscribe to Web Push

```typescript
import { createClientContext } from "@azure/notification-hubs-web";

const CONNECTION_STRING = "<connection-string>";
const HUB_NAME = "<hub-name>";
const VAPID_KEY = "<VAPID public key>";

const clientContext = createClientContext(CONNECTION_STRING, HUB_NAME);

const installation = await getInstallation(clientContext, {
  vapidPublicKey: VAPID_KEY
});

// Save installation ID to your own back end
const tagsToSend = `$InstallationID:{foobarbaz}`;
```

## Receive a Foreground Notification

```typescript
import { createClientContext, onForegroundMessage } from "@azure/notification-hubs-web";

const CONNECTION_STRING = "<connection-string>";
const HUB_NAME = "<hub-name>";
const VAPID_KEY = "<VAPID public key>";

const clientContext = createClientContext(CONNECTION_STRING, HUB_NAME);

onForegroundMessage(clientContext, (notification) => {
  console.log(JSON.stringify(notification));
});
```

## Receive a Background Notification

```typescript
// In a service worker
import { createClientContext, onBackgroundMessage } from "@azure/notification-hubs-web-push-worker";

const CONNECTION_STRING = "<connection-string>";
const HUB_NAME = "<hub-name>";
const VAPID_KEY = "<VAPID public key>";

const clientContext = createClientContext(CONNECTION_STRING, HUB_NAME);

onBackgroundMessage(clientContext, (notification) => {

  notification.addEventListener('click', () => {
    clients.openWindow(notification.clickAction);
  });
});
```
