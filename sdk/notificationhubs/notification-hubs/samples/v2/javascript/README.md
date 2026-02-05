# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                       |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [createInstallation.fcmLegacy.js][createinstallation.fcmlegacy]             | Demonstrates how to create or overwrite an installation using Azure Notification Hubs |
| [createInstallation.fcmV1.js][createinstallation.fcmv1]                     | Demonstrates how to create or overwrite an installation using Azure Notification Hubs |
| [createInstallation.js][createinstallation]                                 | Demonstrates how to create or overwrite an installation using Azure Notification Hubs |
| [createOrUpdateRegistration.js][createorupdateregistration]                 | Demonstrates how to create or update a registration using Azure Notification Hubs.    |
| [createRegistration.fcmLegacy.js][createregistration.fcmlegacy]             | Demonstrates how to create a registration description using Azure Notification hubs.  |
| [createRegistration.fcmV1.js][createregistration.fcmv1]                     | Demonstrates how to create a registration description using Azure Notification hubs.  |
| [createRegistration.js][createregistration]                                 | Demonstrates how to create a registration description using Azure Notification hubs.  |
| [deleteRegistrations.js][deleteregistrations]                               | Demonstrates how to delete all registrations using Azure Notification Hubs            |
| [exportRegistrationsJob.polling.js][exportregistrationsjob.polling]         | Demonstrates how to export registrations from a Notification Hub.                     |
| [exportRegistrationsJob.js][exportregistrationsjob]                         | Demonstrates how to export registrations from a Notification Hub.                     |
| [importRegistrationsJob.poller.js][importregistrationsjob.poller]           | Demonstrates how to import registrations into a Notification Hub.                     |
| [importRegistrationsJob.js][importregistrationsjob]                         | Demonstrates how to import registrations into a Notification Hub.                     |
| [listRegistrations.js][listregistrations]                                   | Demonstrates how to update an installation using Azure Notification Hubs              |
| [listRegistrationsByChannel.js][listregistrationsbychannel]                 | Demonstrates how to update an installation using Azure Notification Hubs              |
| [listRegistrationsByTag.js][listregistrationsbytag]                         | Demonstrates how to update an installation using Azure Notification Hubs              |
| [scheduledSendBroadcastNotification.js][scheduledsendbroadcastnotification] | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [scheduledSendNotification.js][scheduledsendnotification]                   | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [sendBroadcastNotification.js][sendbroadcastnotification]                   | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [sendDirectNotification.fcmLegacy.js][senddirectnotification.fcmlegacy]     | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendDirectNotification.fcmV1.js][senddirectnotification.fcmv1]             | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendDirectNotification.js][senddirectnotification]                         | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendDirectNotificationBatch.js][senddirectnotificationbatch]               | Demonstrates how to send direct notifications using Azure Notification Hubs           |
| [sendTagExpression.js][sendtagexpression]                                   | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [sendTagsList.js][sendtagslist]                                             | Demonstrates how to send tag expression notifications using Azure Notification Hubs   |
| [updateInstallation.js][updateinstallation]                                 | Demonstrates how to update an installation using Azure Notification Hubs              |
| [updateRegistration.js][updateregistration]                                 | Demonstrates how to update an installation using Azure Notification Hubs              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node createInstallation.fcmLegacy.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env NOTIFICATIONHUBS_CONNECTION_STRING="<notificationhubs connection string>" NOTIFICATION_HUB_NAME="<notification hub name>" FCM_REGISTRATION_ID="<fcm registration id>" node createInstallation.fcmLegacy.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createinstallation.fcmlegacy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createInstallation.fcmLegacy.js
[createinstallation.fcmv1]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createInstallation.fcmV1.js
[createinstallation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createInstallation.js
[createorupdateregistration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createOrUpdateRegistration.js
[createregistration.fcmlegacy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createRegistration.fcmLegacy.js
[createregistration.fcmv1]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createRegistration.fcmV1.js
[createregistration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/createRegistration.js
[deleteregistrations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/deleteRegistrations.js
[exportregistrationsjob.polling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/exportRegistrationsJob.polling.js
[exportregistrationsjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/exportRegistrationsJob.js
[importregistrationsjob.poller]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/importRegistrationsJob.poller.js
[importregistrationsjob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/importRegistrationsJob.js
[listregistrations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/listRegistrations.js
[listregistrationsbychannel]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/listRegistrationsByChannel.js
[listregistrationsbytag]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/listRegistrationsByTag.js
[scheduledsendbroadcastnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/scheduledSendBroadcastNotification.js
[scheduledsendnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/scheduledSendNotification.js
[sendbroadcastnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendBroadcastNotification.js
[senddirectnotification.fcmlegacy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendDirectNotification.fcmLegacy.js
[senddirectnotification.fcmv1]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendDirectNotification.fcmV1.js
[senddirectnotification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendDirectNotification.js
[senddirectnotificationbatch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendDirectNotificationBatch.js
[sendtagexpression]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendTagExpression.js
[sendtagslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/sendTagsList.js
[updateinstallation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/updateInstallation.js
[updateregistration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/notificationhubs/notification-hubs/samples/v2/javascript/updateRegistration.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/notification-hubs
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/README.md
