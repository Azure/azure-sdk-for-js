// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushError } from "../errors.js";
import { JsonPatch, updateAzureInstallation } from "../utils/installationHttpClient.js";
import { getInternalInstallation } from "../utils/lifecycleClient.js";
import type { NotificationHubResponse, WebPushClientContext } from "../publicTypes.js";

/**
 * Removes tags from the current installation.
 * @param clientContext - The client context.
 * @param tags - The tags to remove from the installation.
 * @returns The response from the Azure Notification Hubs.
 */
export async function removeTags(
  clientContext: WebPushClientContext,
  tags: string[]
): Promise<NotificationHubResponse> {
  if (!clientContext) {
    throw new WebPushError("clientContext is not properly initilized");
  }

  const installation = await getInternalInstallation(clientContext);
  if (!installation) {
    throw new WebPushError("Installation not set, initialize through getInstallation() first");
  }

  const updates: JsonPatch[] = tags.map(tag => ({
    op: "remove", "path": `/tags/${tag}`
  }));

  return await updateAzureInstallation(clientContext, installation.installationId, updates);
}
