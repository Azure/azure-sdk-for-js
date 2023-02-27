// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushError } from "../errors.js";
import type { NotificationHubResponse, WebPushClientContext } from "../publicTypes.js";
import { JsonPatch, updateAzureInstallation } from "../utils/installationHttpClient.js";
import { getInternalInstallation } from "../utils/lifecycleClient.js";

/**
 * Adds a Web Push template to the current installation.
 * @param clientContext - The client context.
 * @param templateName - The name of the Web Push template to add.
 * @param templateBody - The body of the Web Push template to add.
 * @returns The response from the Azure Notification Hubs.
 */
export async function addTemplate(
  clientContext: WebPushClientContext,
  templateName: string,
  templateBody: string
): Promise<NotificationHubResponse> {
  if (!clientContext) {
    throw new WebPushError("clientContext is not properly initilized");
  }

  const installation = await getInternalInstallation(clientContext);
  if (!installation) {
    throw new WebPushError("Installation not set, initialize through getInstallation() first");
  }

  const updates: JsonPatch[] = [{
    op: "add", path: `/templates/${templateName}`, value: `{ body: "${templateBody}" }}`
  }];

  return await updateAzureInstallation(clientContext, installation.installationId, updates);
}
