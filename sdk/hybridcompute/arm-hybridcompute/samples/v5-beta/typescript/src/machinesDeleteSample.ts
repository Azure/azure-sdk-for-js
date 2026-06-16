// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a hybrid machine.
 *
 * @summary the operation to delete a hybrid machine.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_Delete.json
 */
async function deleteAMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.machines.delete("myResourceGroup", "myMachine");
}

async function main(): Promise<void> {
  await deleteAMachine();
}

main().catch(console.error);
