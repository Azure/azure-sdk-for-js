// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the extension.
 *
 * @summary the operation to get the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_Get_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.get(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaa",
    { expand: "aaaaaaa" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get the extension.
 *
 * @summary the operation to get the extension.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_Get_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetExtensions.get(
    "rgcompute",
    "a",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetExtensionGetMaximumSetGen();
  await virtualMachineScaleSetExtensionGetMinimumSetGen();
}

main().catch(console.error);
