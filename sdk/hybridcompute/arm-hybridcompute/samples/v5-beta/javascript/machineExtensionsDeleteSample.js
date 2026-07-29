// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2026-06-16-preview/extension/Extension_Delete.json
 */
async function deleteAMachineExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.machineExtensions.delete("myResourceGroup", "myMachine", "MMA");
}

async function main() {
  await deleteAMachineExtension();
}

main().catch(console.error);
