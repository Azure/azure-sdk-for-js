// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Delete_MaximumSet_Gen.json
 */
async function virtualMachineExtensionDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineExtensions.delete(
    "rgcompute",
    "aaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
}

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Delete_MinimumSet_Gen.json
 */
async function virtualMachineExtensionDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineExtensions.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaa", "aa");
}

async function main() {
  await virtualMachineExtensionDeleteMaximumSetGen();
  await virtualMachineExtensionDeleteMinimumSetGen();
}

main().catch(console.error);
