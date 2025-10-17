// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine extension image types.
 *
 * @summary gets a list of virtual machine extension image types.
 * x-ms-original-file: 2025-04-01/virtualMachineExtensionImageExamples/VirtualMachineExtensionImage_ListTypes_MaximumSet_Gen.json
 */
async function virtualMachineExtensionImageListTypesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensionImages.listTypes(
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine extension image types.
 *
 * @summary gets a list of virtual machine extension image types.
 * x-ms-original-file: 2025-04-01/virtualMachineExtensionImageExamples/VirtualMachineExtensionImage_ListTypes_MinimumSet_Gen.json
 */
async function virtualMachineExtensionImageListTypesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensionImages.listTypes("aaaa", "aa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineExtensionImageListTypesMaximumSetGen();
  await virtualMachineExtensionImageListTypesMinimumSetGen();
}

main().catch(console.error);
