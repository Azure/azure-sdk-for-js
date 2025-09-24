// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a Addon
 *
 * @summary delete a Addon
 * x-ms-original-file: 2024-09-01/Addons_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function addonsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.addons.delete("group1", "cloud1", "srm");
}

async function main(): Promise<void> {
  await addonsDelete();
}

main().catch(console.error);
