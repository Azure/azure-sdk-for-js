// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 *
 * @summary gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListSkus_MaximumSet_Gen.json
 */
async function virtualMachineImageListSkusMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listSkus(
    "aaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 *
 * @summary gets a list of virtual machine image SKUs for the specified location, publisher, and offer.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListSkus_MinimumSet_Gen.json
 */
async function virtualMachineImageListSkusMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listSkus(
    "aaaa",
    "aaaaaaaaaaaaa",
    "aaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImageListSkusMaximumSetGen();
  await virtualMachineImageListSkusMinimumSetGen();
}

main().catch(console.error);
