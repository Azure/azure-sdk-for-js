# Azure Notification Hubs Samples for Deno

These are the samples for [Deno](https://deno.land/) with Azure Notification Hubs.  Deno 1.28.2+ has support for [npm compatibility](https://deno.land/manual@v1.28.3/node/npm_specifiers) which allows for direct usage of the Azure SDK for Notification Hubs.  Note that our core works against Node LTS versions and if an error is encountered, the developer should be encouraged to file an issue with [Deno directly](https://github.com/denoland/deno) or with the [Deno Standard Library](https://github.com/denoland/deno_std).

## Running Samples

The following scenarios are covered:

The following samples show you the various ways you can interact with Azure
Notification Hubs:

**Device Management:**

- Installations API
  - Create Or Update APNs Installation - `createInstallation.ts`
  - Create Or Update FCM Legacy Installation -
    `createInstallation.fcmLegancy.ts`
  - Update Installation - `updateInstallation.ts`
- Registration API
  - Create Registration - `createRegistration.ts`
  - Create Or Update Registration - `createOrUpdateRegistration.ts`
  - Update Registration - `updateRegistration.ts`
  - List Registrations - `listRegistrations.ts`
  - List Registration By Tag - `listRegistrationsByTag.ts`

**Send Operations:**

- Broadcast Send - `sendBroadcastNotification.ts`
- Direct Send APNs - `sendDirectNotification.ts`
- Direct Send FCM Legacy - `sendDirectNotification.fcmLegacy.ts`
- Direct Batch Send APNs - `sendDirectNotificationBatch.ts`
- Direct Batch Send FCM Legacy - `sendDirectNotificationBatch.fcmLegacy.ts`
- Audience Send With Tags List - `sendTagsList.ts`
- Audience Send With Tag Expression - `sendTagExpression.ts`
- Scheduled Broadcast Send - `scheduledSendBroadcastNotification.ts`
- Scheduled Send - `scheduledSendNotification.ts`

**Management Operations:**

- Export Registrations - `exportRegistrationsJob.ts`
- Export Registrations with Polling - `exportRegistrationsJob.polling.ts`
- Import Registrations - `importRegistrationsJob.ts`
- Import Registrations with Polling - `importRegistrationsJob.polling.ts`

Each sample can be run using the following command, replacing `<demo-name.ts>`
with the file name. To run the samples, the `.env.example` should be filled out
with the appropriate values and renamed to `.env`.

```bash
deno task sample <demo-name.ts>
```
