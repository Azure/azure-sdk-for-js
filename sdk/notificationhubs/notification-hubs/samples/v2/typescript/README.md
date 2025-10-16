# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                       |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [createInstallation.fcmLegacy.ts][createinstallation.fcmlegacy]             | Demonstrates how to create or overwrite an installation using Azure Notification Hubs |
| [createInstallation.fcmV1.ts][createinstallation.fcmv1]                     | Demonstrates how to create or overwrite an installation using Azure Notification Hubs |
| [createInstallation.ts][createinstallation]                                 | Demonstrates how to create or overwrite an installation using Azure Notification Hubs |
| [createOrUpdateRegistration.ts][createorupdateregistration]                 | Demonstrates how to create or update a registration using Azure Notification Hubs.    |
| [createRegistration.fcmLegacy.ts][createregistration.fcmlegacy]             | Demonstrates how to create a registration description using Azure Notification hubs.  |
| [createRegistration.fcmV1.ts][createregistration.fcmv1]                     | Demonstrates how to create a registration description using Azure Notification hubs.  |
| [createRegistration.ts][createregistration]                                 | Demonstrates how to create a registration description using Azure Notification hubs.  |
| [deleteRegistrations.ts][deleteregistrations]                               | Demonstrates how to delete all registrations using Azure Notification Hubs            |
| [exportRegistrationsJob.polling.ts][exportregistrationsjob.polling]         | Demonstrates how to export registrations from a Notification Hub.                     |
| [exportRegistrationsJob.ts][exportregistrationsjob]                         | Demonstrates how to export registrations from a Notification Hub.                     |
| [importRegistrationsJob.poller.ts][importregistrationsjob.poller]           | Demonstrates how to import registrations into a Notification Hub.                     |
| [importRegistrationsJob.ts][importregistrationsjob]                         | Demonstrates how to import registrations into a Notification Hub.                     |
| [listRegistrations.ts][listregistrations]                                   | Demonstrates how to update an installation using Azure Notification Hubs              |
| [listRegistrationsByChannel.ts][listregistrationsbychannel]                 | Demonstrates how to update an installation using Azure Notification Hubs              |
| [listRegistrationsByTag.ts][listregistrationsbytag]                         | Demonstrates how to update an installation using Azure Notification Hubs              |
| [scheduledSendBroadcastNotification.ts][scheduledsendbroadcastnotification] | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [scheduledSendNotification.ts][scheduledsendnotification]                   | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [sendBroadcastNotification.ts][sendbroadcastnotification]                   | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [sendDirectNotification.fcmLegacy.ts][senddirectnotification.fcmlegacy]     | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendDirectNotification.fcmV1.ts][senddirectnotification.fcmv1]             | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendDirectNotification.ts][senddirectnotification]                         | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendDirectNotificationBatch.ts][senddirectnotificationbatch]               | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendTagExpression.ts][sendtagexpression]                                   | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [sendTagsList.ts][sendtagslist]                                             | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [updateInstallation.ts][updateinstallation]                                 | Demonstrates how to update an installation using Azure Notification Hubs              |
| [updateRegistration.ts][updateregistration]                                 | Demonstrates how to update an installation using Azure Notification Hubs              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/createInstallation.fcmLegacy.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env NOTIFICATIONHUBS_CONNECTION_STRING="<notificationhubs connection string>" NOTIFICATION_HUB_NAME="<notification hub name>" FCM_REGISTRATION_ID="<fcm registration id>" node dist/createInstallation.fcmLegacy.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createinstallation.fcmlegacy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createInstallation.fcmLegacy.ts
[createinstallation.fcmv1]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createInstallation.fcmV1.ts
[createinstallation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createInstallation.ts
[createorupdateregistration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createOrUpdateRegistration.ts
[createregistration.fcmlegacy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createRegistration.fcmLegacy.ts
[createregistration.fcmv1]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createRegistration.fcmV1.ts
[createregistration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/createRegistration.ts
[deleteregistrations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/deleteRegistrations.ts
[exportregistrationsjob.polling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/exportRegistrationsJob.polling.ts
[exportregistrationsjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/exportRegistrationsJob.ts
[importregistrationsjob.poller]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/importRegistrationsJob.poller.ts
[importregistrationsjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/importRegistrationsJob.ts
[listregistrations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/listRegistrations.ts
[listregistrationsbychannel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/listRegistrationsByChannel.ts
[listregistrationsbytag]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/listRegistrationsByTag.ts
[scheduledsendbroadcastnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/scheduledSendBroadcastNotification.ts
[scheduledsendnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/scheduledSendNotification.ts
[sendbroadcastnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendBroadcastNotification.ts
[senddirectnotification.fcmlegacy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendDirectNotification.fcmLegacy.ts
[senddirectnotification.fcmv1]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendDirectNotification.fcmV1.ts
[senddirectnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendDirectNotification.ts
[senddirectnotificationbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendDirectNotificationBatch.ts
[sendtagexpression]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendTagExpression.ts
[sendtagslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/sendTagsList.ts
[updateinstallation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/updateInstallation.ts
[updateregistration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/typescript/src/updateRegistration.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/notification-hubs
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
