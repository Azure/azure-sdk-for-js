// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a EdgeActionVersion
 *
 * @summary update a EdgeActionVersion
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Update.json
 */
async function updateEdgeActionVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.update("testrg", "edgeAction1", "version1", {
    properties: { deploymentType: "others" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateEdgeActionVersion();
}

main().catch(console.error);
