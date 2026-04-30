// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the specific private end point connection by specific private link service in the resource group.
 *
 * @summary Get the specific private end point connection by specific private link service in the resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PrivateLinkServiceGetPrivateEndpointConnection.json
 */
async function getPrivateEndPointConnection() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.getPrivateEndpointConnection(
    resourceGroupName,
    serviceName,
    peConnectionName,
  );
  console.log(result);
}

async function main() {
  await getPrivateEndPointConnection();
}

main().catch(console.error);
