// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the currently advertised routes table summary associated with the express route circuit in a resource group.
 *
 * @summary Gets the currently advertised routes table summary associated with the express route circuit in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteCircuitRouteTableSummaryList.json
 */
async function listRouteTableSummary(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const circuitName = "circuitName";
  const peeringName = "peeringName";
  const devicePath = "devicePath";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.expressRouteCircuits.beginListRoutesTableSummaryAndWait(
      resourceGroupName,
      circuitName,
      peeringName,
      devicePath,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await listRouteTableSummary();
}

main().catch(console.error);
