// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushError } from "../errors.js";
import type { JsonPatch, NotificationHubResponse, WebPushClientContext } from "../publicTypes.js";
import { getInternalInstallation } from "../utils/lifecycleClient.js";

/**
 * Removes a Web Push template from the current installation.
 * @param clientContext - The client context.
 * @param templateName - The name of the Web Push template to remove.
 * @returns The response from the Azure Notification Hubs.
 */
export async function removeTemplate(
  clientContext: WebPushClientContext,
  templateName: string
): Promise<NotificationHubResponse> {
  if (!clientContext) {
    throw new WebPushError("clientContext is not properly initilized");
  }

  const installation = await getInternalInstallation(clientContext);
  if (!installation) {
    throw new WebPushError("Installation not set, initialize through getInstallation() first");
  }

  const updates: JsonPatch[] = [
    {
      op: "remove",
      path: `/templates/${templateName}`,
    },
  ];

  return clientContext.lifecycle.updateInstallation(installation.installationId, updates);
}
