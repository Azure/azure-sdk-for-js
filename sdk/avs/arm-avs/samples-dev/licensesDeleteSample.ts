// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a License
 *
 * @summary delete a License
 * x-ms-original-file: 2025-09-01/Licenses_Delete.json
 */
async function licensesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.licenses.delete("group1", "cloud1", "VmwareFirewall");
}

async function main(): Promise<void> {
  await licensesDelete();
}

main().catch(console.error);
