// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { NotificationHubsServiceClient } from "./notificationHubsClient.js";
export * from "./models/installation.js";
export * from "./models/notification.js";
export * from "./models/notificationBuilder.js";
export * from "./models/notificationDetails.js";
export * from "./models/notificationHubJob.js";
export * from "./models/options.js";
export * from "./models/registration.js";
export * from "./models/response.js";

// Client methods
export { clientFromConnectionString, NotificationHubsClient } from "./client/client.js";

// Installation methods
export * from "./client/createOrUpdateInstallation.js";
export * from "./client/deleteInstallation.js";
export * from "./client/getInstallation.js";
export * from "./client/updateInstallation.js";

// Registration methods
export * from "./client/createRegistration.js";
export * from "./client/createRegistrationId.js";
export * from "./client/createOrUpdateRegistration.js";
export * from "./client/getRegistration.js";
export * from "./client/listRegistrations.js";
export * from "./client/listRegistrationsByTag.js";
export * from "./client/updateRegistration.js";

// Send methods
export * from "./client/sendBroadcastNotification.js";
export * from "./client/sendDirectNotification.js";
export * from "./client/sendNotification.js";
export * from "./client/scheduleBroadcastNotification.js";
export * from "./client/scheduleNotification.js";
export * from "./client/cancelScheduledNotification.js";

// Feedback
export * from "./client/getFeedbackContainerUrl.js";
export * from "./client/getNotificationOutcomeDetails.js";

// Jobs
export * from "./client/getNotificationJob.js";
export * from "./client/listNotificationHubJobs.js";
export * from "./client/submitNotificationJob.js";
