// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a TrafficController
 *
 * @summary get a TrafficController
 * x-ms-original-file: 2025-01-01/TrafficControllerGet.json
 */
async function getTrafficController(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.trafficControllerInterface.TrafficControllerInterface_get(
    "rg1",
    "tc1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  getTrafficController();
}

main().catch(console.error);
