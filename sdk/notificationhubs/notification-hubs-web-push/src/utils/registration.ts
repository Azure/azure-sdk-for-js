// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as constants from "./constants.js";
import { WebPushClientContext } from "../client.js";

export async function createRegistration(): Promise<ServiceWorkerRegistration> {
  const registration = await navigator.serviceWorker.register(constants.SERVICE_WORKER_PATH, {
    scope: constants.SERVICE_WORKER_SCOPE,
  });

  // Make update registration async
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registration.update().catch(() => {});

  return registration;
}

export async function updateRegistration(
  clientContext: WebPushClientContext,
  serviceWorkerRegistration?: ServiceWorkerRegistration
): Promise<void> {
  if (!serviceWorkerRegistration && !clientContext.serviceWorkerRegistration) {
    clientContext.serviceWorkerRegistration = await createRegistration();
  }

  if (!serviceWorkerRegistration && !!clientContext.serviceWorkerRegistration) {
    return;
  }

  if (!(serviceWorkerRegistration instanceof ServiceWorkerRegistration)) {
    throw new TypeError("Invalid ServiceWorkerRegistration");
  }

  clientContext.serviceWorkerRegistration = serviceWorkerRegistration;
}
