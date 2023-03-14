// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientContext } from "@azure/notification-hubs-web-push";
import { onNotificationClick, onPush } from "@azure/notification-hubs-web-push/worker";
import type { ServiceWorkerGlobalScope } from "../src/worker/serviceWorkerTypes.js";

const connectionString = "<connection string>";
const hubName = "<hub-name";

declare const self: ServiceWorkerGlobalScope;

interface NotificationMessage {
  title: string;
  body: string;
  icon: string;
}


const clientContext = createClientContext(connectionString, hubName);

const pushSubscription = onPush(clientContext, async (notification) => {
  const message = notification as NotificationMessage;

  // Show notification with title and body
  self.registration.showNotification(message.title, {
    body: message.body,
    icon: message.icon
  });
});

const notificationSubscription = onNotificationClick(clientContext, async (event) => {
  // Close the notification
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();
});

pushSubscription();
notificationSubscription();
