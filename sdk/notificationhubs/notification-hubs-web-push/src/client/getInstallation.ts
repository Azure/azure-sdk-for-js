// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { WebPushClientContext } from "../publicTypes.js";
import { getInternalInstallation } from "./internal/lifecycleClient.js";
import { updateRegistration } from "../utils/serviceWorkerRegistration.js";

export interface GetInstallationOptions {
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

export async function getInstallation(
  clientContext: WebPushClientContext,
  vapidPublicKey: string,
  options: GetInstallationOptions
): Promise<string> {
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
  await updateRegistration(clientContext, options?.serviceWorkerRegistration);

  return getInternalInstallation(clientContext);
}
