# Azure Notification Hubs Samples for Deno

These are the samples for [Deno](https://deno.land/) with Azure Notification Hubs.

## Running Samples

The following scenarios are covered:

The following samples show you the various ways you can interact with Azure Notification Hubs:

**Device Management:**

- Installations API
  - [Create Or Update APNs Installation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/createInstallation.ts)
    - [Create Or Update FCM Legacy Installation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/createInstallation.fcmLegancy.ts)
  - [Update Installation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/updateInstallation.ts)
- Registration API
  - [Create Registration](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/createRegistration.ts)s
  - [Create Or Update Registration](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/createOrUpdateRegistration.ts)
  - [Update Registration](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/updateRegistration.ts)
  - [List Registrations](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/listRegistrations.ts)
  - [List Registration By Tag](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/listRegistrationsByTag.ts)

**Send Operations:**

- [Broadcast Send](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/sendBroadcastNotification.ts)
- [Direct Send APNs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/sendDirectNotification.ts)
- [Direct Send FCM Legacy](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/sendDirectNotification.fcmLegacy.ts)
- [Audience Send With Tags List](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/sendTagsList.ts)
- [Audience Send With Tag Expression](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/sendTagExpression.ts)
- [Scheduled Broadcast Send](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/scheduledSendBroadcastNotification.ts)
- [Scheduled Send](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/scheduledSendNotification.ts)

**Management Operations:**

- [Export Registrations](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/exportRegistrationsJob.ts)
- [Export Registrations with Polling](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/exportRegistrationsJob.polling.ts)
- [Import Registrations](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/importRegistrationsJob.ts)
- [Import Registrations with Polling](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/notificationhubs/notification-hubs/samples/deno/importRegistrationsJob.polling.ts)

Each sample can be run using the following command, replacing `<demo-name.ts>` with the file name.  To run the samples, the `.env.example` should be filled out with the appropriate values and renamed to `.env`.

```bash
deno task sample <demo-name.ts>
```
