// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a IscsiPath
 *
 * @summary delete a IscsiPath
 * x-ms-original-file: 2025-09-01/IscsiPaths_Delete.json
 */
async function iscsiPathsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.iscsiPaths.delete("group1", "cloud1");
}

async function main(): Promise<void> {
  await iscsiPathsDelete();
}

main().catch(console.error);
