// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type {
  GetInstallationOptions,
  WebPushClientContext,
  WebPushInstallation
} from "../publicTypes.js";
import { getInternalInstallation } from "../utils/lifecycleClient.js";
import { updateRegistration } from "../utils/serviceWorkerRegistration.js";

/**
 * Gets the Web Push installation for the current browser.
 * @param clientContext - The Notification Hubs client context.
 * @param vapidPublicKey - The VAPID public key for the Notification Hubs instance.
 * @param options - The options for the getInstallation operation.
 * @returns The Web Push installation.
 */
export async function getInstallation(
  clientContext: WebPushClientContext,
  vapidPublicKey: string,
  options?: GetInstallationOptions
): Promise<WebPushInstallation> {
  if (!navigator) {
    throw new Error("window.navigator is not available");
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission !== "granted") {
    throw new Error("Notification permission has not been granted.");
  }

  clientContext.vapidPublicKey = vapidPublicKey;
  clientContext.serviceWorkerUrl = options?.serviceWorkerUrl;
  await updateRegistration(clientContext, options?.serviceWorkerRegistration);

  return getInternalInstallation(clientContext);
}
