// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Fleet.
 *
 * @summary gets a Fleet.
 * x-ms-original-file: 2026-02-01-preview/Fleets_Get.json
 */
async function getsAFleetResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.get("rgfleets", "fleet1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAFleetResource();
}

main().catch(console.error);
