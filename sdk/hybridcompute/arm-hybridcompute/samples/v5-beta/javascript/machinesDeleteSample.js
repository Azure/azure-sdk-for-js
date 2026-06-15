// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a hybrid machine.
 *
 * @summary the operation to delete a hybrid machine.
 * x-ms-original-file: 2025-09-16-preview/machine/Machines_Delete.json
 */
async function deleteAMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.machines.delete("myResourceGroup", "myMachine");
}

async function main() {
  await deleteAMachine();
}

main().catch(console.error);
