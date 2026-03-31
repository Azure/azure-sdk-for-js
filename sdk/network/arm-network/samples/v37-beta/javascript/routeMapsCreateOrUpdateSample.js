// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a RouteMap if it doesn't exist else updates the existing one.
 *
 * @summary creates a RouteMap if it doesn't exist else updates the existing one.
 * x-ms-original-file: 2025-05-01/RouteMapPut.json
 */
async function routeMapPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeMaps.createOrUpdate("rg1", "virtualHub1", "routeMap1", {
    associatedInboundConnections: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/expressRouteGateways/exrGateway1/expressRouteConnections/exrConn1",
    ],
    associatedOutboundConnections: [],
    rules: [
      {
        name: "rule1",
        actions: [
          { type: "Add", parameters: [{ asPath: ["22334"], community: [], routePrefix: [] }] },
        ],
        matchCriteria: [
          { asPath: [], community: [], matchCondition: "Contains", routePrefix: ["10.0.0.0/8"] },
        ],
        nextStepIfMatched: "Continue",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await routeMapPut();
}

main().catch(console.error);
