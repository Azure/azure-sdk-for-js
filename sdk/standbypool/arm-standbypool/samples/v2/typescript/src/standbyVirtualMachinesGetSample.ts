// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a StandbyVirtualMachineResource
 *
 * @summary get a StandbyVirtualMachineResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachines_Get.json
 */
async function standbyVirtualMachinesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyVirtualMachines.get("rgstandbypool", "pool", "virtualMachine");
  console.log(result);
}

async function main(): Promise<void> {
  await standbyVirtualMachinesGet();
}

main().catch(console.error);
