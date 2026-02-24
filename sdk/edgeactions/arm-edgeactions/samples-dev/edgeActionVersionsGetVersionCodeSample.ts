// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the version code for the edge action version.
 *
 * @summary get the version code for the edge action version.
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_GetVersionCode.json
 */
async function getVersionCode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.getVersionCode(
    "testrg",
    "edgeAction1",
    "version1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getVersionCode();
}

main().catch(console.error);
