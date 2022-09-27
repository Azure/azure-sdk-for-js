// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { deleteInternalInstallation, getInternalInstallation } from "../client/internal/lifecycleClient.js";
import { getClientContextInstance } from "../client.js";
import { PushSubscriptionChangeEvent, ServiceWorkerGlobalScope } from "../workerTypes.js";
import { WebPushError } from "../errors.js";
import { getDBRecord } from "./dataStore.js";
import { deleteAzureInstallation } from "../client/internal/installationHttpClient.js";

declare const self: ServiceWorkerGlobalScope;

// TODO: move to its own file
export async function onPush(event: PushEvent): Promise<void> {

}

export async function onPushSubscriptionChange(event: PushSubscriptionChangeEvent): Promise<void> {
  const clientContext = getClientContextInstance();
  if (!clientContext) {
    throw new WebPushError("WebPushClientContext has not yet been created");
  }

  const { newSubscription } = event;
  if (!newSubscription) {
    // No new subscription so just delete and unregister
    await deleteInternalInstallation(clientContext);
    return;
  }

  const applicationUrl = new URL(clientContext.baseUrl);
  applicationUrl.pathname += `/${clientContext.hubName}`;
  const applicationId = applicationUrl.toString();  
  const record = await getDBRecord(applicationId);
  if (record) {
    await deleteAzureInstallation(clientContext, record.installationId);
  }

  // Re-register
  await getInternalInstallation(clientContext);
}

export async function onNotificationClick(event: NotificationEvent) {

}

export function registerServiceWorker() {
  self.addEventListener("push", (event) => {
    event.waitUntil(onPush(event));
  });

  self.addEventListener("pushsubscriptionchange", (event) => {
    event.waitUntil(onPushSubscriptionChange(event));
  });

  self.addEventListener("notificationclick", (event) => {
    event.waitUntil(onNotificationClick(event));
  })
}
