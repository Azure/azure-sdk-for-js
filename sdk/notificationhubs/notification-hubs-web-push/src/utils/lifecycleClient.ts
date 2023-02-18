// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createOrUpdateAzureInstallation, deleteAzureInstallation } from "./installationHttpClient.js";
import { getDBRecord, putDBRecord, removeDBRecord } from "./dataStore.js";
import type {
  WebPushChannel,
  WebPushClientContext,
  WebPushInstallation
} from "../publicTypes.js";
import { WebPushError } from "../errors.js";

export async function deleteInternalInstallation(
  clientContext: WebPushClientContext
): Promise<boolean> {
  const applicationUrl = new URL(clientContext.baseUrl);
  applicationUrl.pathname += `/${clientContext.hubName}`;
  const applicationId = applicationUrl.toString();

  const installation = await getDBRecord(applicationId);
  if (installation) {
    await deleteAzureInstallation(clientContext, installation.installationId);
    await removeDBRecord(applicationId);
  }

  const subscription = await clientContext.serviceWorkerRegistration!.pushManager.getSubscription();
  if (subscription) {
    return subscription.unsubscribe();
  }

  return true;
}

export async function getInternalInstallation(clientContext: WebPushClientContext): Promise<WebPushInstallation> {
  if (!clientContext.serviceWorkerRegistration) {
    throw new WebPushError("The ServiceWorker requires registration");
  }

  if (!clientContext.vapidPublicKey) {
    throw new WebPushError("VAPID Public Key has not been set");
  }

  const subscription = await getCurrentSubscription(
    clientContext.serviceWorkerRegistration,
    clientContext.vapidPublicKey
  );

  const subscriptionOptions: WebPushChannel = {
    p256dh: base64Encode(subscription.getKey("p256dh")!),
    auth: base64Encode(subscription.getKey("auth")!),
    endpoint: subscription.endpoint,
    vapidPublicKey: clientContext.vapidPublicKey
  };

  const applicationUrl = new URL(clientContext.baseUrl);
  applicationUrl.pathname += `/${clientContext.hubName}`;
  const applicationId = applicationUrl.toString();

  let installation = await getDBRecord(applicationId);
  if (!installation) {
    installation = {
      installationId: crypto.randomUUID(),
      pushChannel: subscriptionOptions
    };

    installation = await putDBRecord(applicationId, installation);
    await createOrUpdateAzureInstallation(clientContext, installation);
  } else if (hasPushChannelChanged(subscriptionOptions, installation.pushChannel)) {
    // Details changed from VAPID, so delete and save a new installation
    await deleteInternalInstallation(clientContext);
    installation = {
      installationId: crypto.randomUUID(),
      pushChannel: subscriptionOptions
    };
  }

  return installation;
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

function hasPushChannelChanged(currentChannel: WebPushChannel, dbPushChannel: WebPushChannel): boolean {
  const isEndpointEqual = currentChannel.endpoint === dbPushChannel.endpoint;
  const isAuthEqual = currentChannel.auth === dbPushChannel.auth;
  const isP256dhEqual = currentChannel.p256dh === dbPushChannel.p256dh;

  return !(isEndpointEqual && isAuthEqual && isP256dhEqual);
}
