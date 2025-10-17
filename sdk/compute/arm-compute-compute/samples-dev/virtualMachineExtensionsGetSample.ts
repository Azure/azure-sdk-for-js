// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the extension.
 *
 * @summary the operation to get the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Get_MaximumSet_Gen.json
 */
async function virtualMachineExtensionGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensions.get(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaa",
    { expand: "aaaaaa" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the extension.
 *
 * @summary the operation to get the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Get_MinimumSet_Gen.json
 */
async function virtualMachineExtensionGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensions.get("rgcompute", "myVM", "myVMExtension");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineExtensionGetMaximumSetGen();
  await virtualMachineExtensionGetMinimumSetGen();
}

main().catch(console.error);
