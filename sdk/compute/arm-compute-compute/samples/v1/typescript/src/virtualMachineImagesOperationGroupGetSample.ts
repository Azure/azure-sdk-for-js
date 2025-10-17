// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual machine image.
 *
 * @summary gets a virtual machine image.
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_Get_MaximumSet_Gen.json
 */
async function virtualMachineImageGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.get(
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
 * x-ms-original-file: 2025-04-01/virtualMachineImageExamples/VirtualMachineImage_Get_MinimumSet_Gen.json
 */
async function virtualMachineImageGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineImagesOperationGroup.get(
    "aaaaaaaaaaaa",
    "aaaaaaaaaaa",
    "aa",
    "aaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineImageGetMaximumSetGen();
  await virtualMachineImageGetMinimumSetGen();
}

main().catch(console.error);
