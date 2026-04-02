// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the details of a ExpressRoute gateway in a resource group.
 *
 * @summary fetches the details of a ExpressRoute gateway in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteGatewayGet.json
 */
async function expressRouteGatewayGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteGateways.get(
    "resourceGroupName",
    "expressRouteGatewayName",
  );
  console.log(result);
}

async function main() {
  await expressRouteGatewayGet();
}

main().catch(console.error);
