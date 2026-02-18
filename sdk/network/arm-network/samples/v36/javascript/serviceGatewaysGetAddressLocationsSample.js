// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get address locations in service gateway.
 *
 * @summary Get address locations in service gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceGatewayGetAddressLocationsResponse.json
 */
async function getAddressLocationsInServiceGateway() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceGatewayName = "sg";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceGateways.listAddressLocations(
    resourceGroupName,
    serviceGatewayName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAddressLocationsInServiceGateway();
}

main().catch(console.error);
