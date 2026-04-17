// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get all extensions of a Virtual Machine.
 *
 * @summary the operation to get all extensions of a Virtual Machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_List_MaximumSet_Gen.json
 */
async function virtualMachineExtensionListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensions.list("rgcompute", "aaaaaaaaaaaaa", {
    expand: "aaaaaaaaaaaaaaaaa",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to get all extensions of a Virtual Machine.
 *
 * @summary the operation to get all extensions of a Virtual Machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachineExtension_List_MinimumSet_Gen.json
 */
async function virtualMachineExtensionListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineExtensions.list(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineExtensionListMaximumSetGen();
  await virtualMachineExtensionListMinimumSetGen();
}

main().catch(console.error);
