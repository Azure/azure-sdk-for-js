// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { WebPushClientContext } from "../client.js";
import { getCurrentInstallation } from "./internal/subscription.js";
import { updateRegistration } from "../utils/registration.js";

export interface GetInstallationOptions {
  vapidPublicKey: string;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

export async function getInstallationId(
  clientContext: WebPushClientContext,
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

  clientContext.vapidPublicKey = options.vapidPublicKey;
  await updateRegistration(clientContext, options?.serviceWorkerRegistration);

  return getCurrentInstallation(clientContext);
}
