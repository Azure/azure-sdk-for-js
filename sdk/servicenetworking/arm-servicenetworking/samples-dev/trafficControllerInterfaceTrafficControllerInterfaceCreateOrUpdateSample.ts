// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a TrafficController
 *
 * @summary create a TrafficController
 * x-ms-original-file: 2025-01-01/TrafficControllerPut.json
 */
async function putTrafficController(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.trafficControllerInterface.createOrUpdate("rg1", "tc1", {
    location: "NorthCentralUS",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putTrafficController();
}

main().catch(console.error);
