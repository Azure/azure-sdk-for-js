// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get all extensions of a Virtual Machine.
 *
 * @summary the operation to get all extensions of a Virtual Machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_List_MaximumSet_Gen.json
 */
async function virtualMachineExtensionListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineExtensions.list("rgcompute", "aaaaaaaaaaaaa", {
    expand: "aaaaaaaaaaaaaaaaa",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to the operation to get all extensions of a Virtual Machine.
 *
 * @summary the operation to get all extensions of a Virtual Machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_List_MinimumSet_Gen.json
 */
async function virtualMachineExtensionListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineExtensions.list(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineExtensionListMaximumSetGen();
  await virtualMachineExtensionListMinimumSetGen();
}

main().catch(console.error);
