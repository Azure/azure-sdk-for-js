// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get a run command.
 *
 * @summary the operation to get a run command.
 * x-ms-original-file: 2025-09-16-preview/runCommand/RunCommands_Get.json
 */
async function getARunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machineRunCommands.get(
    "myResourceGroup",
    "myMachine",
    "myRunCommand",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARunCommand();
}

main().catch(console.error);
