// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine image offers for the specified location and publisher.
 *
 * @summary gets a list of virtual machine image offers for the specified location and publisher.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListOffers_MaximumSet_Gen.json
 */
async function virtualMachineImageListOffersMaximumSetGen(): Promise<void> {
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
async function virtualMachineImageListOffersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listOffers(
    "aaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImageListOffersMaximumSetGen();
  await virtualMachineImageListOffersMinimumSetGen();
}

main().catch(console.error);
