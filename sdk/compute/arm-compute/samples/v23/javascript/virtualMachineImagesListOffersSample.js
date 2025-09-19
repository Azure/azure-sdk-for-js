// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary Gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImage_ListOffers_MaximumSet_Gen.json
 */
async function virtualMachineImageListOffersMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "aaaaaaa";
  const publisherName = "aaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.listOffers(location, publisherName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary Gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineImageExamples/VirtualMachineImage_ListOffers_MinimumSet_Gen.json
 */
async function virtualMachineImageListOffersMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "aaaaaaaaaaaaaaaaa";
  const publisherName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImages.listOffers(location, publisherName);
  console.log(result);
}

async function main() {
  await virtualMachineImageListOffersMaximumSetGen();
  await virtualMachineImageListOffersMinimumSetGen();
}

main().catch(console.error);
