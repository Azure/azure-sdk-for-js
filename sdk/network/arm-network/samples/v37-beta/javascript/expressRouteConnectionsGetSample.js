// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified ExpressRouteConnection.
 *
 * @summary gets the specified ExpressRouteConnection.
 * x-ms-original-file: 2025-05-01/ExpressRouteConnectionGet.json
 */
async function expressRouteConnectionGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteConnections.get(
    "resourceGroupName",
    "expressRouteGatewayName",
    "connectionName",
  );
  console.log(result);
}

async function main() {
  await expressRouteConnectionGet();
}

main().catch(console.error);
