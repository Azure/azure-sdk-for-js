// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Fleet.
 *
 * @summary gets a Fleet.
 * x-ms-original-file: 2025-03-01/Fleets_Get.json
 */
async function getsAFleetResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.get("rg1", "fleet1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Fleet.
 *
 * @summary gets a Fleet.
 * x-ms-original-file: 2025-03-01/Fleets_Get_MaximumSet_Gen.json
 */
async function getsAFleetResourceGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.get("rgfleets", "fleet1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAFleetResource();
  await getsAFleetResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
