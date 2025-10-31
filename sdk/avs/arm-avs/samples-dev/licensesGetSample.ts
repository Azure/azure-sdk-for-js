// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a License
 *
 * @summary get a License
 * x-ms-original-file: 2025-09-01/Licenses_Get.json
 */
async function licensesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.licenses.get("group1", "cloud1", "VmwareFirewall");
  console.log(result);
}

async function main(): Promise<void> {
  await licensesGet();
}

main().catch(console.error);
