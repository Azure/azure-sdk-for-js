// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Gate
 *
 * @summary get a Gate
 * x-ms-original-file: 2025-04-01-preview/Gates_Get.json
 */
async function getsAGateResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.gates.get("rg1", "fleet1", "12345678-910a-bcde-f000-000000000000");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAGateResource();
}

main().catch(console.error);
