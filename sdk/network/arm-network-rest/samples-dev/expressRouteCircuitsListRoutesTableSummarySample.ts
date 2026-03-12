// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the currently advertised routes table summary associated with the express route circuit in a resource group.
 *
 * @summary Gets the currently advertised routes table summary associated with the express route circuit in a resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ExpressRouteCircuitRouteTableSummaryList.json
 */

import type { ExpressRouteCircuitsListRoutesTableSummaryParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listRouteTableSummary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const circuitName = "circuitName";
  const peeringName = "peeringName";
  const devicePath = "devicePath";
  const options: ExpressRouteCircuitsListRoutesTableSummaryParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/routeTablesSummary/{devicePath}",
      subscriptionId,
      resourceGroupName,
      circuitName,
      peeringName,
      devicePath,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

listRouteTableSummary().catch(console.error);
