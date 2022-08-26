// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushChannel, WebPushInstallation } from "../../models/installation.js";
import { WebPushClientContext } from "../../client.js";

export async function getCurrentInstallation(clientContext: WebPushClientContext): Promise<string> {
  const subscription = await getCurrentSubscription(
    clientContext.serviceWorkerRegistration!,
    clientContext.vapidPublicKey!
  );

  const pushChannel: WebPushChannel = {
    p256dh: base64Encode(subscription.getKey("p256dh")!),
    auth: base64Encode(subscription.getKey("auth")!),
    endpoint: subscription.endpoint,
  };

  const installation: WebPushInstallation = {
    installationId: "",
    pushChannel,
    platform: "browser",
  };

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
