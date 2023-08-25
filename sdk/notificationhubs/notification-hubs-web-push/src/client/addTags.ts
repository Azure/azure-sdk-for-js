// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushError } from "../errors.js";
import { getInternalInstallation } from "../utils/lifecycleClient.js";
import { updateInstallation } from "../utils/installationHttpClient.js";
import type { JsonPatch, NotificationHubResponse, WebPushClientContext } from "../publicTypes.js";

/**
 * Adds tags to the current installation.
 * @param clientContext - The client context.
 * @param tags - The tags to add to the installation.
 * @returns The response from the Azure Notification Hubs.
 */
export async function addTags(
  clientContext: WebPushClientContext,
  tags: string[],
): Promise<NotificationHubResponse> {
  if (!clientContext) {
    throw new WebPushError("clientContext is not properly initilized");
  }

  const installation = await getInternalInstallation(clientContext);
  if (!installation) {
    throw new WebPushError("Installation not set, initialize through getInstallation() first");
  }

  const updates: JsonPatch[] = tags.map((tag) => ({
    op: "add",
    path: "/tags",
    value: tag,
  }));

  return updateInstallation(clientContext, installation.installationId, updates);
}
