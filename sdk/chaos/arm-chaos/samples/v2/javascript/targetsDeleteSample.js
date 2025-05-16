// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Target resource that extends a tracked regional resource.
 *
 * @summary delete a Target resource that extends a tracked regional resource.
 * x-ms-original-file: 2025-01-01/Targets_Delete.json
 */
async function deleteATargetThatExtendsAVirtualMachineResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.targets.delete(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
    "Microsoft-Agent",
  );
}

async function main() {
  await deleteATargetThatExtendsAVirtualMachineResource();
}

main().catch(console.error);
