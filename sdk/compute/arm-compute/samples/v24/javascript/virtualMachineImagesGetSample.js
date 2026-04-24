// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a virtual machine image.
 *
 * @summary gets a virtual machine image.
 * x-ms-original-file: 2025-11-01/virtualMachineImageExamples/VirtualMachineImage_Get_MaximumSet_Gen.json
 */
async function virtualMachineImageGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.get(
    "aaaaaa",
    "aaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a virtual machine image.
 *
 * @summary gets a virtual machine image.
 * x-ms-original-file: 2025-11-01/virtualMachineImageExamples/VirtualMachineImage_Get_MinimumSet_Gen.json
 */
async function virtualMachineImageGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.get(
    "aaaaaaaaaaaa",
    "aaaaaaaaaaa",
    "aa",
    "aaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImageGetMaximumSetGen();
  await virtualMachineImageGetMinimumSetGen();
}

main().catch(console.error);
