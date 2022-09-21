// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushClientContext } from "../client.js";
import { deleteInstallation as deleteInstallationInternal } from "../client/internal/deleteInstallation.js";
import { WebPushError } from "../errors.js";
import { getDBRecord, removeDBRecord } from "../utils/dataStore.js";
import { updateRegistration } from "../utils/registration.js";

export async function deleteInstallation(
  clientContext: WebPushClientContext,
): Promise<boolean> {
  if (!navigator) {
    throw new WebPushError("This method is only allowed in the Window context");
  }

  if (!clientContext.serviceWorkerRegistration) {
    await updateRegistration(clientContext);
  }

  const applicationUrl = new URL(clientContext.baseUrl);
  applicationUrl.pathname += `/${clientContext.hubName}`;
  const applicationId = applicationUrl.toString();

  const installation = await getDBRecord(applicationId);
  if (installation) {
    await deleteInstallationInternal(clientContext, installation.installationId);
    await removeDBRecord(applicationId);
  }

  const subscription = await clientContext.serviceWorkerRegistration!.pushManager.getSubscription();
  if (subscription) {
    return subscription.unsubscribe();
  }

  return true;
}
