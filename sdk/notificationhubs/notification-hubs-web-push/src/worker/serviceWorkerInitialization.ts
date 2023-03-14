// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { 
  NotificationEvent,
  PushEvent,
  PushSubscriptionChangeEvent, 
  ServiceWorkerGlobalScope 
} from "./serviceWorkerTypes.js";
import type { WebPushClientContext } from "../publicTypes.js";
import { _getClientContextInstance } from "../client.js";
import { deleteInternalInstallation, getInternalInstallation } from "../utils/lifecycleClient.js";
import { getDBRecord } from "../utils/dataStore.js";

declare const self: ServiceWorkerGlobalScope;

export function registerServiceWorkerMethods(): void {
  self.addEventListener("push",  (event: PushEvent) => {
    event.waitUntil(onPush(_getClientContextInstance()!, event));
  });

  self.addEventListener("pushsubscriptionchange", (event: PushSubscriptionChangeEvent) => {
    event.waitUntil(onPushSubscriptionChange(_getClientContextInstance()!, event));
  });

  self.addEventListener("notificationclick", (event: NotificationEvent) => {
    event.waitUntil(onNotificationClick(_getClientContextInstance()!, event));
  });
}

export async function onPush(
  clientContext: WebPushClientContext,
  event: PushEvent
): Promise<void> {
  if (!clientContext) {
    return;
  }

  const json = extractJson(event);
  if (!json) {
    return;
  }

  if (clientContext.onPush) {
    await clientContext.onPush(json);
  }
}

export async function onPushSubscriptionChange(
  clientContext: WebPushClientContext,
  event: PushSubscriptionChangeEvent
): Promise<void> {
  const { newSubscription } = event;
  await deleteInternalInstallation(clientContext);

  if (!newSubscription) {
    return;
  }

  const applicationUrl = new URL(clientContext.baseUrl);
  applicationUrl.pathname += `/${clientContext.hubName}`;
  const applicationId = applicationUrl.toString();

  let installation = await getDBRecord(applicationId);

  clientContext.vapidPublicKey = installation?.pushChannel.vapidPublicKey;

  await getInternalInstallation(clientContext);
}

export async function onNotificationClick(
  clientContext: WebPushClientContext,
  event: NotificationEvent
): Promise<void> {

  if (!clientContext) {
    return;
  }

  if (clientContext.onNotificationClick) {
    await clientContext.onNotificationClick({ action: event.action, notification: event.notification });
  }
}

function extractJson({ data }: PushEvent): unknown {
  if (!data) {
    return null;
  }

  try {
    return data.json();
  } catch (e) {
    return null;
  }
}
