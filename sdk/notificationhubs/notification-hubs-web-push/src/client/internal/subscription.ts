// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushClientContext } from "../../client.js";
import { WebPushChannel } from "../../models/installation.js";
import { getDBRecord, putDBRecord } from "../../utils/dataStore.js";
import { v4 as uuid } from "uuid";

export async function getCurrentInstallation(clientContext: WebPushClientContext): Promise<string> {
  if (!clientContext.serviceWorkerRegistration) {
    throw new Error("The ServiceWorker requires registration");
  }

  if (!clientContext.vapidPublicKey) {
    throw new Error("VAPID Public Key has not been set");
  }

  const subscription = await getCurrentSubscription(
    clientContext.serviceWorkerRegistration,
    clientContext.vapidPublicKey
  );

  const subscriptionOptions: WebPushChannel = {
    p256dh: base64Encode(subscription.getKey("p256dh")!),
    auth: base64Encode(subscription.getKey("auth")!),
    endpoint: subscription.endpoint,
    scope: clientContext.serviceWorkerRegistration.scope,
  };

  const applicationUrl = new URL(clientContext.baseUrl);
  applicationUrl.pathname += clientContext.hubName;
  const applicationId = applicationUrl.toString();

  let installation = await getDBRecord(applicationId);
  if (!installation) {
    installation = {
      installationId: uuid(),
      platform: "browser",
      pushChannel: subscriptionOptions
    };

    installation = await putDBRecord(applicationId, installation);
    // TODO: Save to Notification Hubs
  }

  // TODO: Check if installation expired and create new installation and resave

  return installation.installationId;
}

async function getCurrentSubscription(
  serviceWorkerRegistration: ServiceWorkerRegistration,
  vapidPublicKey: string
): Promise<PushSubscription> {
  const subscription = await serviceWorkerRegistration!.pushManager.getSubscription();
  if (subscription) {
    return subscription;
  }

  return serviceWorkerRegistration!.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(vapidPublicKey),
  });
}

function urlB64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = self.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function base64Encode(arrayBuffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}
