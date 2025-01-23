// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a TrafficController
 *
 * @summary delete a TrafficController
 * x-ms-original-file: 2025-01-01/TrafficControllerDelete.json
 */
async function deleteTrafficController(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.trafficControllerInterface.TrafficControllerInterface_delete("rg1", "tc1");
}

async function main(): Promise<void> {
  deleteTrafficController();
}

main().catch(console.error);
