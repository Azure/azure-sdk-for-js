// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists ExpressRouteConnections.
 *
 * @summary lists ExpressRouteConnections.
 * x-ms-original-file: 2025-05-01/ExpressRouteConnectionList.json
 */
async function expressRouteConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteConnections.list(
    "resourceGroupName",
    "expressRouteGatewayName",
  );
  console.log(result);
}

async function main() {
  await expressRouteConnectionList();
}

main().catch(console.error);
