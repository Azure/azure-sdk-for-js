# Guide to migrate from `azure-sb` to `@azure/notification-hubs`

This guide will help you migrate from the deprecated `azure-sb` package to the new `@azure/notification-hubs` package.  This will focus on a side-by-side comparison between the two libraries for similar operations between the two packages.

Familiarity with the `azure-sb` package is assumed.  For those are new to the `azure-sb` package, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/README.md) and [Notification Hubs Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples-dev) for the `@azure/notification-hubs` package.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
  - [New features](#new-features)
- [Important changes](#important-changes)
  - [Client hierarchy](#client-hierarchy)
  - [Registration management](#registration-management)
  - [Installation management](#installation-management)
  - [Sending notifications](#sending-notifications)
- [Additional samples](#additional-samples)

## Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To try and improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript specific guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that these libraries have a natural and idiomatic feel. Further details are available in the guidelines for those interested.

### Cross Service SDK improvements

The new version of the Notification Hubs library also shares some of the cross-service improvements made to the Azure development experience, such as:

- Modular development that allows for tree shaking and importing only the functionality that is needed.
- A unified logging and diagnostics pipeline that offers a common view of the activities across each of the client libraries.
- The use of promises rather than callbacks for a simplified programming experience.
- The use of async iterators in paging APIs.

### New features

We have a variety of new features in the `@azure/notification-hubs` library such as the following:

- Support for additional Push Notification Providers such as
  - Amazon Device Message (ADM)
  - Baidu Cloud Push
  - Firebase Cloud Messaging (FCM) V1
  - Xiaomi Message Service
  - Web Push
- Scheduled Notifications for Standard SKU and higher.
- Batch direct send notification support.
- Telemetry support for notification feedback.
- Notification Hub import and export job support.
- Ability to configure the retry policy used by the operations on the client.
- Ability to cancel async operations on the client using the abort signal from `@azure/abort-controller`.

## Important changes

### Client hierarchy

In the interest of simplifying the API surface we've made a single top level client called `NotificationHubsClient` which supports all Push Notifications Services instead of using a properties such as `apns`, `gcm` and `wns`.  This means that you can now use the same client to send notifications to any of the supported Push Notification Services.  In addition, modular exports are supported where you can import only the functionality that you need.

In `azure-sb`:

```typescript
const { NotificationHubsService } = require("azure-sb");

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(HUB_NAME, CONNECTION_STRING);

const message = `{ "aps": { "alert": "Hello Azure" } }`;
const tags = "likes_football";

notificationHubsClient.apns.send(tags, message, (error, result) => {
  if (error) {
    console.log("Error sending notification: ", error);
  } else {
    console.log("Notification sent successfully: ", result);
  }
});
```

In `@azure/notification-hubs` with the service client:

```typescript
import { NotificationHubsClient, createAppleNotification } from "@azure/notification-hubs";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(CONNECTION_STRING, HUB_NAME);

const message = createAppleNotification({
  body: `{ "aps": { "alert": "Hello Azure" } }`
});

const tagExpression = "likes_football";

const result = await notificationHubsClient.sendNotification(message, { tagExpression });
```

In `@azure/notification-hubs` with modular exports:

```typescript
import { createClientContext, sendNotification } from "@azure/notification-hubs/api";
import { createAppleNotification } from "@azure/notificationhubs/models";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const context = createClientContext(CONNECTION_STRING, HUB_NAME);

const message = createAppleNotification({
  body: `{ "aps": { "alert": "Hello Azure" } }`
});

const tagExpression = "likes_football";

const result = await sendNotification(context, message, { tagExpression });
```

### Registration management

As noted, the `azure-sb` package subdivided functionality per Platform Notification Service such as `apns`, `gcm`, and `wns` so that you can create and update registrations.  With the `@azure/notification-hubs` package, all methods are available at the root and you can use the `createRegistration` method to create a registration for any of the supported Push Notification Services.  This also supports `createRegistrationId`, `createOrUpdateRegistration` and `updateRegistrations`.  The list features are also available to list registrations by tags or other criteria through`listRegistrationsByTags` and `listRegistrationsByTag`.

```typescript
const { NotificationHubsService } = require("azure-sb");

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(HUB_NAME, CONNECTION_STRING);

const DEVICE_TOKEN = "<device-token>";
const TAGS = "likes_football";

notificationHubsClient.apns.createNativeRegistration(DEVICE_TOKEN, TAGS, (error, result) => {
  if (error) {
    console.log("Error creating registration: ", error);
  } else {
    console.log("Registration created successfully: ", result);
  }
});
```

In `@azure/notification-hubs` with the service client:

```typescript
import {
  NotificationHubsClient,
  createAppleRegistrationDescription,
} from "@azure/notification-hubs";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";

const client = new NotificationHubsClient(CONNECTION_STRING, HUB_NAME);

const DEVICE_TOKEN = "<device-token>";
const TAGS = ["likes_hockey", "likes_football"];

let registration = createAppleRegistrationDescription({
  deviceToken: DEVICE_TOKEN,
  tags: TAGS,
});

registration = await client.createRegistration(registration);
```

In `@azure/notification-hubs` with modular exports:

```typescript
import { createClientContext, createRegistration } from "@azure/notification-hubs/api";
import { createAppleRegistrationDescription } from "@azure/notification-hubs/models";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const context = createClientContext(CONNECTION_STRING, HUB_NAME);

const DEVICE_TOKEN = "<device-token>";
const TAGS = ["likes_hockey", "likes_football"];

let registration = createAppleRegistrationDescription({
  deviceToken: DEVICE_TOKEN,
  tags: TAGS,
});

registration = await createRegistration(context, registration);
```

### Installation management

Installations are a newer approach to registering devices with Azure Notification Hubs.  This functionality uses JSON APIs to create and update installations.  The `azure-sb` package supported this through the main client and not through the specific platforn notification services properties.  The `@azure/notification-hubs` package supports this through the main client as well as through the modular exports.

In `azure-sb`:

```typescript
const { NotificationHubsService } = require("azure-sb");

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(HUB_NAME, CONNECTION_STRING);

const DEVICE_TOKEN = "<device-token>";
const TAGS = ["likes_hockey", "likes_football"];

const installation = {
  installationId: `<installation-id>`,
  platform: "apple",
  pushChannel: DEVICE_TOKEN,
  tags: TAGS,
};

notificationHubsClient.createOrUpdateInstallation(installation, (error, newInstallation) => {
  if (error) {
    console.log("Error creating installation: ", error);
  } else {
    console.log("Installation created successfully: ", newInstallation.installationId);
  }
});
```

In `@azure/notification-hubs` with the service client:

```typescript
import { NotificationHubsClient, createAppleInstallation } from "@azure/notification-hubs";
import { v4 as uuid } from "uuid";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";

const client = new NotificationHubsClient(CONNECTION_STRING, HUB_NAME);

const DEVICE_TOKEN = "<device-token>";
const TAGS = ["likes_hockey", "likes_football"];

// Create an installation for APNs
let installation = createAppleInstallation({
  installationId: uuid(),
  pushChannel: DEVICE_TOKEN,
  tags: TAGS,
});

installation = await client.createOrUpdateInstallation(installation);
```

In `@azure/notification-hubs` with modular exports:

```typescript
import { createClientContext, createOrUpdateInstallation } from "@azure/notification-hubs/api";
import { createAppleInstallation } from "@azure/notification-hubs/models";
import { v4 as uuid } from "uuid";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const context = createClientContext(CONNECTION_STRING, HUB_NAME);

const DEVICE_TOKEN = "<device-token>";
const TAGS = ["likes_hockey", "likes_football"];

// Create an installation for APNs
let installation = createAppleInstallation({
  installationId: uuid(),
  pushChannel: DEVICE_TOKEN,
  tags: TAGS,
});


installation = await createOrUpdateInstallation(context, installation);
```

### Sending notifications

The `azure-sb` package supported sending notifications through the `send` method on the main client which only allowed tag based send operations.  These were through each subclient tied to the Platform Notification Services such as `apns`, `gcm`, and `wns`.  The `@azure/notification-hubs` package supports this through the main client as well as through the modular exports with the `sendNotification` method.  This method also supports direct send operations which sends to a specific device, which `azure-sb` did not support.

In `azure-sb`:

```typescript
const { NotificationHubsService } = require("azure-sb");

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(HUB_NAME, CONNECTION_STRING);

const message = `{ "aps": { "alert": "Hello Azure" } }`;
const tags = "likes_football";

notificationHubsClient.apns.send(tags, message, (error, result) => {
  if (error) {
    console.log("Error sending notification: ", error);
  } else {
    console.log("Notification sent successfully: ", result);
  }
});
```

Tag based send in `@azure/notification-hubs` with the service client:

```typescript
import { NotificationHubsClient, createAppleNotification } from "@azure/notification-hubs";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(CONNECTION_STRING, HUB_NAME);

const message = createAppleNotification({
  body: `{ "aps": { "alert": "Hello Azure" } }`
});

const tagExpression = "likes_football";

const result = await notificationHubsClient.sendNotification(message, { tagExpression });
```

Tag based send in `@azure/notification-hubs` with modular exports:

```typescript
import { createClientContext, sendNotification } from "@azure/notification-hubs/api";
import { createAppleNotification } from "@azure/notificationhubs/models";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const context = createClientContext(CONNECTION_STRING, HUB_NAME);

const message = createAppleNotification({
  body: `{ "aps": { "alert": "Hello Azure" } }`
});

const tagExpression = "likes_football";

const result = await sendNotification(context, message, { tagExpression });
```

Direct send in `@azure/notification-hubs` with the service client:

```typescript
import { NotificationHubsClient, createAppleNotification } from "@azure/notification-hubs";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const notificationHubsClient = new NotificationHubsService(CONNECTION_STRING, HUB_NAME);

const message = createAppleNotification({
  body: `{ "aps": { "alert": "Hello Azure" } }`
});

const deviceHandle = "<device-handle>";

const result = await notificationHubsClient.sendNotification(message, { deviceHandle });
```

Direct send in `@azure/notification-hubs` with modular exports:

```typescript
import { createClientContext, sendNotification } from "@azure/notification-hubs/api";
import { createAppleNotification } from "@azure/notificationhubs/models";

const HUB_NAME = "<hub-name>";
const CONNECTION_STRING = "<connection-string>";  

const context = createClientContext(CONNECTION_STRING, HUB_NAME);

const message = createAppleNotification({
  body: `{ "aps": { "alert": "Hello Azure" } }`
});

const deviceHandle = "<device-handle>";

const result = await sendNotification(context, message, { deviceHandle });
```

## Additional samples

More examples can be found at [Samples for @azure/notification-hubs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples-dev/)
