// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Gate
 *
 * @summary get a Gate
 * x-ms-original-file: 2025-08-01-preview/Gates_Get.json
 */
async function getsAGateResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.gates.get("rg1", "fleet1", "12345678-910a-bcde-f000-000000000000");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Gate
 *
 * @summary get a Gate
 * x-ms-original-file: 2025-08-01-preview/Gates_Get_MaximumSet_Gen.json
 */
async function gatesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A5DFED4F-5511-4753-B6C8-3ACC54B370E3";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.gates.get(
    "rgfleets",
    "fleet-1",
    "12345678-910a-bcde-f000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAGateResource();
  await gatesGetMaximumSet();
}

main().catch(console.error);
