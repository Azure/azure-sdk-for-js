// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete private end point connection for a private link service in a subscription.
 *
 * @summary Delete private end point connection for a private link service in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PrivateLinkServiceDeletePrivateEndpointConnection.json
 */
async function deletePrivateEndPointConnectionForAPrivateLinkService() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceName = "testPls";
  const peConnectionName = "testPlePeConnection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.beginDeletePrivateEndpointConnectionAndWait(
    resourceGroupName,
    serviceName,
    peConnectionName,
  );
  console.log(result);
}

async function main() {
  await deletePrivateEndPointConnectionForAPrivateLinkService();
}

main().catch(console.error);
