// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a TrafficController
 *
 * @summary update a TrafficController
 * x-ms-original-file: 2025-03-01-preview/TrafficControllerPatch.json
 */
async function patchTrafficController(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.trafficControllerInterface.update("rg1", "tc1", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchTrafficController();
}

main().catch(console.error);
