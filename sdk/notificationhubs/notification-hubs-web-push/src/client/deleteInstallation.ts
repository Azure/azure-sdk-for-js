// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushClientContext } from "../publicTypes.js";
import { WebPushError } from "../errors.js";
import { deleteInternalInstallation } from "./internal/lifecycleClient.js";
import { updateRegistration } from "../utils/serviceWorkerRegistration.js";

export async function deleteInstallation(
  clientContext: WebPushClientContext,
): Promise<boolean> {
  if (!navigator) {
    throw new WebPushError("This method is only allowed in the Window context");
  }

  if (!clientContext.serviceWorkerRegistration) {
    await updateRegistration(clientContext);
  }

  return deleteInternalInstallation(clientContext);
}
