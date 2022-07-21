// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { NotificationHubsServiceClient } from "./notificationHubsClient";
export * from "./models/installation";
export * from "./models/notification";
export * from "./models/notificationBuilder";
export * from "./models/notificationDetails";
export * from "./models/notificationHubJob";
export * from "./models/options";
export * from "./models/registration";
export * from "./models/response";

// Client methods
export { clientFromConnectionString, NotificationHubsClient } from "./client/client";

// Installation methods
export * from "./client/createOrUpdateInstallation";
export * from "./client/deleteInstallation";
export * from "./client/getInstallation";
export * from "./client/updateInstallation";

// Registration methods
export * from "./client/createRegistration";
export * from "./client/createRegistrationId";
export * from "./client/createOrUpdateRegistration";
export * from "./client/getRegistration";
export * from "./client/listRegistrations";
export * from "./client/listRegistrationsByTag";
export * from "./client/updateRegistration";

// Send methods
export * from "./client/sendBroadcastNotification";
export * from "./client/sendDirectNotification";
export * from "./client/sendNotification";
export * from "./client/scheduleBroadcastNotification";
export * from "./client/scheduleNotification";
export * from "./client/cancelScheduledNotification";

// Feedback
export * from "./client/getFeedbackContainerUrl";
export * from "./client/getNotificationOutcomeDetails";

// Jobs
export * from "./client/getNotificationJob";
export * from "./client/listNotificationHubJobs";
export * from "./client/submitNotificationJob";
