// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get address locations in service gateway.
 *
 * @summary get address locations in service gateway.
 * x-ms-original-file: 2025-05-01/ServiceGatewayGetAddressLocationsResponse.json
 */
async function getAddressLocationsInServiceGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceGateways.listAddressLocations("rg1", "sg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAddressLocationsInServiceGateway();
}

main().catch(console.error);
