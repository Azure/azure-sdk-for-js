// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine extension image versions.
 *
 * @summary gets a list of virtual machine extension image versions.
 * x-ms-original-file: 2025-04-01/virtualMachineExtensionImageExamples/VirtualMachineExtensionImage_ListVersions_MaximumSet_Gen.json
 */
async function virtualMachineExtensionImageListVersionsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensionImages.listVersions(
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaa",
    { filter: "aaaaaaaaaaaaaaaaaaaaaaaaa", top: 22, orderby: "a" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a list of virtual machine extension image versions.
 *
 * @summary gets a list of virtual machine extension image versions.
 * x-ms-original-file: 2025-04-01/virtualMachineExtensionImageExamples/VirtualMachineExtensionImage_ListVersions_MinimumSet_Gen.json
 */
async function virtualMachineExtensionImageListVersionsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensionImages.listVersions(
    "aaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineExtensionImageListVersionsMaximumSetGen();
  await virtualMachineExtensionImageListVersionsMinimumSetGen();
}

main().catch(console.error);
