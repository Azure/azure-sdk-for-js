// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_Delete_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetExtensions.delete(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
  );
}

/**
 * This sample demonstrates how to the operation to delete the extension.
 *
 * @summary the operation to delete the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_Delete_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetExtensions.delete(
    "rgcompute",
    "aaaa",
    "aaaaaaaaaaaaaaaaaaaaaaa",
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetExtensionDeleteMaximumSetGen();
  await virtualMachineScaleSetExtensionDeleteMinimumSetGen();
}

main().catch(console.error);
