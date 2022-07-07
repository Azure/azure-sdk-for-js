# Azure Notification Hubs SDK for JavaScript

Azure Notification Hubs provide a scaled-out push engine that enables you to send notifications to any platform (Apple, Amazon Kindle, Android, Baidu, Web, Windows, etc.) from any back-end (cloud or on-premises). Notification Hubs works great for both enterprise and consumer scenarios. Here are a few example scenarios:

- Send breaking news notifications to millions with low latency.
- Send location-based coupons to interested user segments.
- Send event-related notifications to users or groups for media/sports/finance/gaming applications.
- Push promotional contents to applications to engage and market to customers.
- Notify users of enterprise events such as new messages and work items.
- Send codes for multi-factor authentication.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/) |
[Product documentation](https://docs.microsoft.com/azure/notification-hubs/) |

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Install the package

```bash
npm install @azure/notification-hubs
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

### Authenticate the client

Interaction with an Azure Notification Hub starts with the `NotificationHubClient` which supports [Shared Access Signature connection strings](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-security).  This includes the following permission levels: **Listen**, **Manage**, **Send**.

Listen allows for a client to register itself via the Registration and Installations API. Send allows for the client to send notifications to devices using the send APIs. Finally, Manage allows the user to do Registration and Installation management, such as queries.

A new `NotificationHubClient` client can be created using the `clientFromConnectionString` method with the connection string and Notification Hub name.

```typescript
import { clientFromConnectionString } from "@azure/notification-hubs";

const client = clientFromConnectionString("<connection string>", "<hub name>");
```

## Key concepts

Once the `NotificationHubClient` has been initialized, the following concepts can be explored.

- Device Management via Installations and RegistrationDescriptions
- Send Notifications to Devices

### Device Management

Device management is a core concept to Notification Hubs to be able to store the unique identifier from the native Platform Notification Service (PNS) such as APNs or Firebase, and associated metadata such as tags used for sending push notifications to audiences.  This is done with two APIs, the Installation API which is the newer and preferred mechanism, and Registrations.

#### Installations API

Installations are a newer and native JSON approach to device management that contains additional properties such as an installation ID and user ID which can be used for sending to audiences.  The installations API has a few advantages over the existing Registration APIs in the following ways:

- Fully idempotent API so calling create on the installation, so an operation can be retried without worries about duplications.
- Support for `userId` and `installationId` properties which can be then used in tag expressions such as `$InstallationId:myInstallId` and `$UserId:bob@contoso.com`.
- Templates are now part of the installation instead of a separate registration and can be reference by name as a tag for sending.
- Partial updates are supported through the [JSON Patch Standard](https://tools.ietf.org/html/rfc6902), which allows to add tags and change other data without having to first query the installation.

Installations can be created through the `createOrUpdateInstallation` method such as the following:

```typescript
import { clientFromConnectionString, createAppleInstallation } from "@azure/notification-hubs";
import { v4 } from "uuid";

const client = clientFromConnectionString("<connection string>", "<hub name>");

// Create an installation for APNs
let installation = createAppleInstallation({
  installationId: v4(), // Must be unique
  pushChannel: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0", // PNS specific handle
  tags: ["likes_hockey", "likes_football"],
});

installation = await client.createOrUpdateInstallation(installation);
```

An update to an installation can be made through the JSON Patch schema such as adding a tag and a user ID using the `updateInstallation` method.

```typescript
import { clientFromConnectionString, JsonPatch } from "@azure/notification-hubs";

const client = clientFromConnectionString("<connection string>", "<hub name>");

const installationId = "<unique installation ID">;

const updates: JsonPatch[] = [
  { op: "add", path: "/tags", value: "likes_baseball" },
  { op: "add", path: "/userId", value: "bob@contoso.com" },
];

const installation = await client.updateInstallation(installationId, updates);
```

To retrieve an existing installation, use the `getInstallation` method with your existing unique installation ID.

```typescript
import { clientFromConnectionString } from "@azure/notification-hubs";

const client = clientFromConnectionString("<connection string>", "<hub name>");

const installationId = "<unique installation ID">;

const installation = client.getInstallation(installationId);
```

#### Registrations API

A registration is associated with a PNS just as the installation above, with the unique device identifier from the PNS, and associated tags.  Templates registrations are a way of creating pre-defined body templates which can then be customized at send time with properties to fill in for the message.  For more information about templates, see [Templates documentation](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-templates-cross-platform-push-messages).

An installation may be created in one of two ways, first by getting a registration ID from the server using `getInstallationId` and then `createOrUpdateRegistration` or via the `createRegistration` method.  The former is preferred so that it can be idempotent, so that retries can be done without worries of additional registrations created.

```typescript
import {
  createAppleRegistrationDescription,
  clientFromConnectionString,
} from "@azure/notification-hubs";

const client = clientFromConnectionString("<connection string>", "<hub name>");

const registrationId = await client.getRegistrationId();

let registration = createAppleRegistrationDescription({
  registrationId,
  deviceToken: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0",
  tags: ["likes_hockey", "likes_football"],
});

registration = await client.createOrUpdateRegistration(registration);
```

Updates can be done via the `updateRegistration` method but unlike installations, does not support incremental updates.  Querying for an existing registration can be done with the `getRegistration` method.

```typescript
import { clientFromConnectionString } from "@azure/notification-hubs";

const client = clientFromConnectionString("<connection string>", "<hub name>");

const registrationId = "<unique Registration ID>";

let registration = await client.getRegistration(registrationId);

registration.tags.push("likes_sports");

registration = await client.updateRegistration(registration);
```

Registrations, unlike installations, can be queried to get all registrations, matching registrations to a condition, or by tags.  Registrations can be queried using the `listRegistrations` and `listRegistrationsByTag` method.  Both methods support limiting via the `top` option and support asynchronous paging.

```typescript
import { clientFromConnectionString } from "@azure/notification-hubs";

const client = clientFromConnectionString("<connection string>", "<hub name>");

const top = 100;

const registrations = await client.getRegistrationsByTag("likes_hockey", { top });

let page = 0;
for await (const pages of registrations.byPage()) {
  console.log(`Page number ${page}`);
  for (const item of pages) {
    console.log(JSON.stringify(item, null, 2));
  }
}
```

### Send Operations

Notification Hubs supports sending notifications to devices either directly using the unique PNS provided identifier, or using tags for audience send.  Using the Standard SKU and above, [scheduled send](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-send-push-notifications-scheduled) allows the user to schedule notifications up to seven days in advance.  All send operations return a Tracking ID and Correlation ID which can be used for Notification Hubs support cases.  With the Standard SKU and above, a Notification ID is also returned which can be used to get notification telemetry via the `getNotificationOutcomeDetails` method.

#### Direct Send

To send directly a device, the user can send using the platform provided unique identifier such as APNs device token by calling the `sendDirectNotification` method.  For debugging purposes, `enableTestSend` can be set to `true` which gets immediate feedback from the PNS, however, is not supported in production scenarios.

```typescript
import {
  createAppleMessage,
  clientFromConnectionString,
  SendOperationOptions,
} from "@azure/notification-hubs";

const client = clientFromConnectionString(connectionString, hubName);

const deviceToken = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

const message = createAppleMessage({
  body: messageBody,
  headers: {
    "apns-priority": "10",
    "apns-push-type": "alert",
  },
});

// Not required but can set test send to true for debugging purposes.
const sendOptions: SendOperationOptions = { enableTestSend: false };
const result = await client.sendDirectNotification(devicetoken, message, sendOptions);

console.log(`Tracking ID: ${result.trackingId}`);
console.log(`Correlation ID: ${result.correlationId}`);

// Only available in Standard SKU and above
if (result.notificationId) {
  console.log(`Notification ID: ${result.notificationId}`);
}
```

#### Audience Send

In addition to targeting a single device, a user can target multiple devices using tags.  These tags can be supplied as a list of tags, which then creates a tag expression to match registered devices, or via a tag expression which can then use Boolean logic to target the right audience.  For more information about tags and tags expressions, see [Routing and Tag Expressions](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-tags-segment-push-message).

```typescript
import {
  createAppleMessage,
  clientFromConnectionString,
  SendOperationOptions,
} from "@azure/notification-hubs";

const client = clientFromConnectionString(connectionString, hubName);

const tagExpression = "likes_hockey && likes_football";
const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

const message = createAppleMessage({
  body: messageBody,
  headers: {
    "apns-priority": "10",
    "apns-push-type": "alert",
  },
});


// Not required but can set test send to true for debugging purposes.
const sendOptions: SendOperationOptions = { enableTestSend: false };
const result = await client.sendNotification(tagExpression, message, sendOptions);

console.log(`Tracking ID: ${result.trackingId}`);
console.log(`Correlation ID: ${result.correlationId}`);

// Only available in Standard SKU and above
if (result.notificationId) {
  console.log(`Notification ID: ${result.notificationId}`);
}
```

#### Scheduled Send

Push notifications can be scheduled up to seven days in advance with Standard SKU namespaces and above using the `scheduleSend` method.  This returns a notification ID which can be then used to cancel if necessary via the `cancelScheduledSend` method.

```typescript
import {
  createAppleMessage,
  clientFromConnectionString,
  SendOperationOptions,
} from "@azure/notification-hubs";

const client = clientFromConnectionString(connectionString, hubName);

const tagExpression = "likes_hockey && likes_football";
const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

// Schedule 8 hours from nows
const scheduledTime = new Date(Date.now() + (8 * 60 * 60 * 1000));

const message = createAppleMessage({
  body: messageBody,
  headers: {
    "apns-priority": "10",
    "apns-push-type": "alert",
  },
});

// Not required but can set test send to true for debugging purposes.
const sendOptions: SendOperationOptions = { enableTestSend: false };
const result = await client.sendNotification(tagExpression, message, sendOptions);

console.log(`Tracking ID: ${result.trackingId}`);
console.log(`Correlation ID: ${result.correlationId}`);

// Can be used to cancel via the cancelScheduledSend method
console.log(`Notification ID: ${result.notificationId}`);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

The following samples show you the various ways you can interact with Azure Notification Hubs:

**Device Management:**

- Installations API
  - [Create Or Update Installation](samples-dev/createInstallation.ts)
  - [Update Installation](samples-dev/updateInstallation.ts)
- Registration API
  - [Create Registration](samples-dev/createRegistration.ts)
  - [Create Or Update Registration](samples-dev/createOrUpdateRegistration.ts)
  - [Update Registration](samples-dev/updateRegistration.ts)
  - [List Registrations](samples-dev/listRegistrations.ts)
  - [List Registration By Tag](samples-dev/listRegistrationsByTag.ts)

**Send Operations:**

- [Direct Send](samples-dev/sendDirectNotification.ts)
- [Audience Send With Tags List](samples-dev/sendTagsList.ts)
- [Audience Send With Tag Expression](samples-dev/sendTagExpression.ts)
- [Scheduled Send](samples-dev/scheduledSendNotification.ts)

**Management Operations:**

- [Export Registrations](samples-dev/exportRegistrationsJob.ts)
- [Import Registrations](samples-dev/importRegistrationsJob.ts)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Notification Hubs instance. To execute the tests you'll need to run:

1. `rush update`
2. `rush build -t @azure/notification-hubs`
3. Create a .env file with these contents in the `sdk\notificationhubs\notification-hubs` folder:
   `NH_CONNECTION_STRING=connection string for your Notification Hubs instance`
4. `cd sdk\notificationhubs\notification-hubs`
5. `npm run test`.

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure Notification Hubs](https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-overview)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%notificationhubs%2Fnotification-hubs%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
