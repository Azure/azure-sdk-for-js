// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Target resource that extends a tracked regional resource.
 *
 * @summary create or update a Target resource that extends a tracked regional resource.
 * x-ms-original-file: 2025-01-01/Targets_CreateOrUpdate.json
 */
async function createOrUpdateATargetThatExtendsAVirtualMachineResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.targets.createOrUpdate(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
    "Microsoft-VirtualMachine",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateATargetThatExtendsAVirtualMachineResource();
}

main().catch(console.error);
