// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a GlobalReachConnection
 *
 * @summary create a GlobalReachConnection
 * x-ms-original-file: 2024-09-01/GlobalReachConnections_CreateOrUpdate.json
 */
async function globalReachConnectionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.globalReachConnections.createOrUpdate(
    "group1",
    "cloud1",
    "connection1",
    {
      properties: {
        peerExpressRouteCircuit:
          "/subscriptions/12341234-1234-1234-1234-123412341234/resourceGroups/mygroup/providers/Microsoft.Network/expressRouteCircuits/mypeer",
        authorizationKey: "01010101-0101-0101-0101-010101010101",
      },
    },
  );
  console.log(result);
}

async function main() {
  await globalReachConnectionsCreateOrUpdate();
}

main().catch(console.error);
