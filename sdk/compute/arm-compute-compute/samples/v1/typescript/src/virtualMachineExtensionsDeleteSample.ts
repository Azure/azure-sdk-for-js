// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Delete_MaximumSet_Gen.json
 */
async function virtualMachineExtensionDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineExtensions.delete(
    "rgcompute",
    "aaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
}

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_Delete_MinimumSet_Gen.json
 */
async function virtualMachineExtensionDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineExtensions.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaaa", "aa");
}

async function main(): Promise<void> {
  await virtualMachineExtensionDeleteMaximumSetGen();
  await virtualMachineExtensionDeleteMinimumSetGen();
}

main().catch(console.error);
