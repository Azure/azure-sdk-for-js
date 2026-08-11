// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the extension.
 *
 * @summary the operation to get the extension.
 * x-ms-original-file: 2026-06-16-preview/extension/Extension_Get.json
 */
async function getMachineExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machineExtensions.get(
    "myResourceGroup",
    "myMachine",
    "CustomScriptExtension",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMachineExtension();
}

main().catch(console.error);
