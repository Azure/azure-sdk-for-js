// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual machine extension image.
 *
 * @summary gets a virtual machine extension image.
 * x-ms-original-file: 2025-04-01/virtualMachineExtensionImageExamples/VirtualMachineExtensionImage_Get_MaximumSet_Gen.json
 */
async function virtualMachineExtensionImageGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensionImages.get(
    "aaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a virtual machine extension image.
 *
 * @summary gets a virtual machine extension image.
 * x-ms-original-file: 2025-04-01/virtualMachineExtensionImageExamples/VirtualMachineExtensionImage_Get_MinimumSet_Gen.json
 */
async function virtualMachineExtensionImageGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensionImages.get(
    "aaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aa",
    "aaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineExtensionImageGetMaximumSetGen();
  await virtualMachineExtensionImageGetMinimumSetGen();
}

main().catch(console.error);
