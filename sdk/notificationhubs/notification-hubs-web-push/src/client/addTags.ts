// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonPatch, updateAzureInstallation } from "./internal/installationHttpClient.js";
import { WebPushClientContext } from "../publicTypes.js";
import { getInternalInstallation } from "./internal/lifecycleClient.js";

export async function addTags(
  clientContext: WebPushClientContext,
  tags: string | string[]
): Promise<void> {
  const currentInstallation = await getInternalInstallation(clientContext);
  const tagsToSend = Array.isArray(tags) ? tags : [tags];

  const updates: JsonPatch[] = tagsToSend.map((tag) => ({
    op: "add",
    path: "/tags",
    value: tag
  }));
  
  await updateAzureInstallation(clientContext, currentInstallation, updates);
  // TODO: Update installation in DB
}
