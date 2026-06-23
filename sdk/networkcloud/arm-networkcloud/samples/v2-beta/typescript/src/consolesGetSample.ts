// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of the provided virtual machine console.
 *
 * @summary get properties of the provided virtual machine console.
 * x-ms-original-file: 2026-05-01-preview/Consoles_Get.json
 */
async function getVirtualMachineConsole(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.consoles.get("resourceGroupName", "virtualMachineName", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualMachineConsole();
}

main().catch(console.error);
