// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the tags of an Edge Action version. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. Version properties are not changed. If deploymentType or isDefaultVersion is supplied, it must match the existing value; use swapDefault to change the default version.
 *
 * @summary updates the tags of an Edge Action version. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. Version properties are not changed. If deploymentType or isDefaultVersion is supplied, it must match the existing value; use swapDefault to change the default version.
 * x-ms-original-file: 2026-10-01/EdgeActionVersions_Update.json
 */
async function updateEdgeActionVersionTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.update("testrg", "edgeAction1", "version1", {
    tags: { environment: "production" },
    properties: { deploymentType: "zip", isDefaultVersion: "True" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateEdgeActionVersionTags();
}

main().catch(console.error);
