// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a VirtualMachine
 *
 * @summary get a VirtualMachine
 * x-ms-original-file: 2024-09-01/VirtualMachines_Get.json
 */
async function virtualMachinesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.virtualMachines.get("group1", "cloud1", "cluster1", "vm-209");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachinesGet();
}

main().catch(console.error);
