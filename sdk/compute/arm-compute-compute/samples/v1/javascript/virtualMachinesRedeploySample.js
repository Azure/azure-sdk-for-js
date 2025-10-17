// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to shuts down the virtual machine, moves it to a new node, and powers it back on.
 *
 * @summary shuts down the virtual machine, moves it to a new node, and powers it back on.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Redeploy_MaximumSet_Gen.json
 */
async function virtualMachineRedeployMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.redeploy("rgcompute", "a");
  console.log(result);
}

/**
 * This sample demonstrates how to shuts down the virtual machine, moves it to a new node, and powers it back on.
 *
 * @summary shuts down the virtual machine, moves it to a new node, and powers it back on.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Redeploy_MinimumSet_Gen.json
 */
async function virtualMachineRedeployMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.redeploy("rgcompute", "aaaaaaaaaaaaaaa");
  console.log(result);
}

async function main() {
  await virtualMachineRedeployMaximumSetGen();
  await virtualMachineRedeployMinimumSetGen();
}

main().catch(console.error);
