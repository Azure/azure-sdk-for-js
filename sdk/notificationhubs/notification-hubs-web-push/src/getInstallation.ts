// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { v4 as uuid } from "uuid";

export interface GetInstallationOptions {
  vapidPublicKey?: string;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}

export async function getInstallation(): Promise<string> {
  if (!navigator) {
    throw new Error("window.navigator is not available");
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }

  if (Notification.permission !== "granted") {
    throw new Error("Notification permission has not been granted.");
  }

  // TODO: Calculate Installation ID
  const installationId = uuid();

  return installationId;
}
