// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 *
 * @summary gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_List_MaximumSet_Gen.json
 */
async function virtualMachineImageListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.list(
    "aaaaaaaaaaaaaaa",
    "aaaaaa",
    "aaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaa",
    { expand: "aaaaaaaaaaaaaaaaaaaaaaaa", top: 18, orderby: "aa" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 *
 * @summary gets a list of all virtual machine image versions for the specified location, publisher, offer, and SKU.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_List_MinimumSet_Gen.json
 */
async function virtualMachineImageListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.list(
    "aaaaaaa",
    "aaaaaaaaaaa",
    "aaaaaaaaaa",
    "aaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImageListMaximumSetGen();
  await virtualMachineImageListMinimumSetGen();
}

main().catch(console.error);
