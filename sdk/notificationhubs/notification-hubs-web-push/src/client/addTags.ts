// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { JsonPatch, updateInstallation } from "./internal/updateInstallation.js";
import { WebPushClientContext } from "../client.js";
import { getCurrentInstallation } from "./internal/subscription.js";

export async function addTags(
  clientContext: WebPushClientContext,
  tags: string | string[]
): Promise<void> {
  const currentInstallation = await getCurrentInstallation(clientContext);
  const tagsToSend = Array.isArray(tags) ? tags : [tags];

  const updates: JsonPatch[] = [];
  for (const tag of tagsToSend) {
    updates.push({
      op: "add",
      path: "/tags",
      value: tag
    });
  }
  
  await updateInstallation(clientContext, currentInstallation, updates);
  // TODO: Update installation in DB
}
