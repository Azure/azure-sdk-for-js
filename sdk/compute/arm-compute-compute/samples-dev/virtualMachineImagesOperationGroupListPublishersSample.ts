// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine image publishers for the specified Azure location.
 *
 * @summary gets a list of virtual machine image publishers for the specified Azure location.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListPublishers_MaximumSet_Gen.json
 */
async function virtualMachineImageListPublishersMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listPublishers("aaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine image publishers for the specified Azure location.
 *
 * @summary gets a list of virtual machine image publishers for the specified Azure location.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_ListPublishers_MinimumSet_Gen.json
 */
async function virtualMachineImageListPublishersMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.listPublishers(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImageListPublishersMaximumSetGen();
  await virtualMachineImageListPublishersMinimumSetGen();
}

main().catch(console.error);
