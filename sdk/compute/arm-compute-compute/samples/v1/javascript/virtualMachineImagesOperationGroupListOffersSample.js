// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListOffers_MaximumSet_Gen.json
 */
async function virtualMachineImageListOffersMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listOffers("aaaaaaa", "aaaaaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListOffers_MinimumSet_Gen.json
 */
async function virtualMachineImageListOffersMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listOffers(
    "aaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineImageListOffersMaximumSetGen();
  await virtualMachineImageListOffersMinimumSetGen();
}

main().catch(console.error);
