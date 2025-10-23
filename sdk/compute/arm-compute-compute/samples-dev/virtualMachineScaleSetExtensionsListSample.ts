// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all extensions in a VM scale set.
 *
 * @summary gets a list of all extensions in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_List_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetExtensions.list(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all extensions in a VM scale set.
 *
 * @summary gets a list of all extensions in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_List_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetExtensions.list(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetExtensionListMaximumSetGen();
  await virtualMachineScaleSetExtensionListMinimumSetGen();
}

main().catch(console.error);
