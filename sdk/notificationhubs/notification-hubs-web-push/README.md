# Azure Notification Hubs Web Push SDK for JavaScript

Azure Notification Hubs provide a scaled-out push engine that enables you to send notifications to any platform (Apple, Amazon Kindle, Android, Baidu, Web, Windows, etc.) from any back-end (cloud or on-premises). Notification Hubs works well for both enterprise and consumer scenarios. Here are a few example scenarios:

- Send breaking news notifications to millions with low latency.
- Send location-based coupons to interested user segments.
- Send event-related notifications to users or groups for media/sports/finance/gaming applications.
- Push promotional contents to applications to engage and market to customers.
- Notify users of enterprise events such as new messages and work items.
- Send codes for multi-factor authentication.

The Web Push SDK provides support for the [Push API](https://developer.mozilla.org/docs/Web/API/Push_API) for registering the browser for push notifications for the web client, and to intercept push notifications for the [Service Worker API](https://developer.mozilla.org/docs/Web/API/Service_Worker_API).

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs-web-push/)
- [Package (npm)](https://www.npmjs.com/package/@azure/notification-hubs-web-push)
- [Product documentation](https://docs.microsoft.com/azure/notification-hubs/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs-web-push/samples-dev)

## Getting started

### Currently supported environments

- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Install the package

```bash
npm install @azure/notification-hubs-web-push
```

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An [App Notification Hubs](https://docs.microsoft.com/azure/notification-hubs/) resource.

### Create an Azure Notification Hubs resource

An Azure Notification Hub can be created using the following methods:

1. [Azure Portal](https://docs.microsoft.com/azure/notification-hubs/create-notification-hub-portal)
2. [Azure CLI](https://docs.microsoft.com/azure/notification-hubs/create-notification-hub-azure-cli)
3. [Bicep](https://docs.microsoft.com/azure/notification-hubs/create-notification-hub-bicep)
4. [ARM Template](https://docs.microsoft.com/azure/notification-hubs/create-notification-hub-template)

Once created, the Notification Hub can be configured using the [Azure Portal or Azure CLI](https://docs.microsoft.com/azure/notification-hubs/configure-notification-hub-portal-pns-settings?tabs=azure-portal).

### Importing the Web Registration Client

The Azure Notification Hubs Web Push SDK has a single entry point of the client context which can be created via the `createClientContext` method.  This SDK follows a modular approach to single exports for methods.  The modular approach allows the developer to pick and choose which functions to import as each method is exposed individually.  This approach uses subpath-exports with ES-Modules to expose the methods via direct imports.  With the individual exports, this creates a better tree-shaking experience and smaller bundle sizes that the developer can take advantage of.  

Note that the web application and the service worker code is separated using subpath exports.  The following paths are exposed:

- `@azure/notification-hubs-web-push` - The main entry point with `createClientContext`.
- `@azure/notification-hubs-web-push/client` - The web application specific methods such as tag and template management.
- `@azure/notification-hubs-web-push/worker` - The ServiceWorker specific methods such as receiving a push notification and when the notification is clicked.

### Authenticate the client

Interaction with an Azure Notification Hub starts with the `createClientContext` which supports [Shared Access Signature connection strings](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-security).  This includes the following permission levels: **Listen**, **Manage**, **Send**.

Listen allows for a client to register itself via the Registration and Installations API. Send allows for the client to send notifications to devices using the send APIs. Finally, Manage allows the user to do Registration and Installation management, such as queries.  For Web Push only **Listen** should be used.

A new client context can be created using the constructor with the connection string and Notification Hub name.

```typescript
import { clientContext } from "@azure/notification-hubs-web-push";
import { getInstallation } from "@azure/notification-hubs-web-push/client";

const connectionString = "<connection string>";
const hubName = "<hub-name";

const clientContext = createClientContext(connectionString, hubName);
```

## Key concepts

Once the `clientContext` has been initialized, the following concepts can be explored.

- Web Push Registration
- Registration Tag Management
- Receive Web Push Notifications

### Web Push Registration

Device management is a core concept to Notification Hubs to be able to store the unique identifier from the native Web Push to be able to send Web Push notifications.  The Azure Notification Hubs Web Push JavaScript SDK uses Installations to save the information to the backend and register the device for push notifications.  To start with the SDK, you will need a ServiceWorker which is used for receiving push notifications and displaying them, and the URL will be given to the SDK to be able to register for Web Push.

To register for Web Push notifications, the `getInstallation` method is used.  This method will register the browser for push notifications and save the installation to the backend.    The `getInstallation` method takes the following parameters:

- `clientContext` - The client context created using the `createClientContext` method.
- `vapidPublicKey` - The VAPID public key used to encrypt the push notification payload.
- `options` - Which includes a URL for the Service Worker for registration.

**This must only be called in a user defined gesture such as a button click and is not intended to be called on page load.**

```typescript
import { createClientContext } from "@azure/notification-hubs-web-push";

const connectionString = "<connection string>";
const hubName = "<hub-name";
const VapidPublicKey = "<vapid-public-key>";
const serviceWorkerUrl = "service-worker.js";

const clientContext = createClientContext(connectionString, hubName);

const installation = await getInstallation(
  clientContext, 
  VapidPublicKey, 
  { serviceWorkerUrl: "service-worker.js" }
);
```

Once called, the `getInstallation` will ensure that the website is registered for push notifications, and saved the installation to the Azure Notification Hubs backend.  This operation must be called first before any subsequent operations such as tag or template management.

### Tag Management

Tag expressions enable you to target specific sets of devices, or more specifically installations, when sending a push notification through Notification Hubs.  The only way to target specific notification registrations is to associate tags with them, then target those tags.  A tag can be any string, up to 120 characters, containing alphanumeric and the following non-alphanumeric characters: `'_'`, `'@'`, `'#'`, `'.'`, `':'`, `'-'`.

To support tag management, we have two methods, one for adding tags via `addTags` and other to remove them via `removeTags.

```typescript
import { createClientContext } from "@azure/notification-hubs-web-push";
import { getInstallation, addTags, removeTags } from "@azure/notification-hubs-web-push/client";

const connectionString = "<connection string>";
const hubName = "<hub-name";
const VapidPublicKey = "<vapid-public-key>";
const serviceWorkerUrl = "service-worker.js";

const clientContext = createClientContext(connectionString, hubName);

const installation = await getInstallation(
  clientContext, 
  VapidPublicKey, 
  { serviceWorkerUrl: "service-worker.js" }
);

// Add tags to the installation
await addTags(clientContext, ["likes_hockey", "likes_football"]);

// Removes tags from the installation
await removeTags(clientContext, ["likes_football"]);
```

### Template Management

Templates enable a client application to specify the exact format of the notifications it wants to receive. Using templates, an app can realize several different benefits, including the following:

- A platform-agnostic backend
- Personalized notifications
- Client-version independence
- Easy localization

The Azure Notification Hubs SDK for Web Push supports template management through `addTemplate` and `removeTemplate`.

```typescript
import { createClientContext } from "@azure/notification-hubs-web-push";
import { getInstallation, addTemplate, removeTemplate } from "@azure/notification-hubs-web-push/client";

const connectionString = "<connection string>";
const hubName = "<hub-name";
const VapidPublicKey = "<vapid-public-key>";
const serviceWorkerUrl = "service-worker.js";

const clientContext = createClientContext(connectionString, hubName);

const installation = await getInstallation(
  clientContext, 
  VapidPublicKey, 
  { serviceWorkerUrl: "service-worker.js" }
);

const templateBody = `{"alert": {"title": "$(title)", "body": "$(body}}`;

// Add a template to the installation
await addTemplate(clientContext, "helloTemplate", templateBody);

// Remove a template from the installation
await removeTemplate(clientContext, "helloTemplate");
```

### Receiving Web Push Notifications

When you use the client SDK, you are required to specify a ServiceWorker at a given URL in order to receive push notifications.  This can be completely custom code, or you can use some helpers from the `@azure/notification-hubs-web-push/worker` subpath, such as to receive push notifications.  You can then ship your own service worker using this SDK.

To get push notifications, you can use the `onPush` method, which when a push notification is received, will be forwarded to the handler.

```typescript
import { createClientContext } from "@azure/notification-hubs-web-push";
import { onPush } from "@azure/notification-hubs-web-push/worker";

const connectionString = "<connection string>";
const hubName = "<hub-name";

const clientContext = createClientContext(connectionString, hubName);

const subscription = onPush(clientContext, (notification) => {

  // Show notification with title and body
  self.registration.showNotification(notification.title, {
    body: notification.body,
    icon: notification.icon
  });
});
```

### Handling Notification Click Events

In addition to handling the push notification, you can also handle the click event on the notification.  This can be used to open a specific page in the application, or to perform some other action.  To handle the click event, you can use the `onNotificationClick` method.

```typescript
import { createClientContext } from "@azure/notification-hubs-web-push";
import { onPush } from "@azure/notification-hubs-web-push/worker";

const connectionString = "<connection string>";
const hubName = "<hub-name";

const clientContext = createClientContext(connectionString, hubName);

const subscription = onNotificationClick(clientContext, (event) => {
  // Close the notification
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();
});
```

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure Notification Hubs](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-overview)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%notificationhubs%2Fnotification-hubs-web-push%2FREADME.png)
