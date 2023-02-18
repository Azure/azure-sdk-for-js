// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushError } from "../errors.js";
import type { NotificationHubResponse, WebPushClientContext } from "../publicTypes.js";
import { JsonPatch, updateAzureInstallation } from "../utils/installationHttpClient.js";
import { getInternalInstallation } from "../utils/lifecycleClient.js";

export async function removeTemplate(
  clientContext: WebPushClientContext,
  templateName: string
): Promise<NotificationHubResponse> {
  const installation = await getInternalInstallation(clientContext);
  if (!installation) {
    throw new WebPushError("Installation not set, initialize through getInstallation() first");
  }

  const updates: JsonPatch[] = [{
    op: "remove", path: `/templates/${templateName}`
  }];

  return await updateAzureInstallation(clientContext, installation.installationId, updates);
}
