// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a StandbyVirtualMachinePoolResource
 *
 * @summary get a StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Get.json
 */
async function standbyVirtualMachinePoolsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyVirtualMachinePools.get("rgstandbypool", "pool");
  console.log(result);
}

async function main(): Promise<void> {
  await standbyVirtualMachinePoolsGet();
}

main().catch(console.error);
