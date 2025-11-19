// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to execute a delete on Network Fabric Service Internet Gateway.
 *
 * @summary execute a delete on Network Fabric Service Internet Gateway.
 * x-ms-original-file: 2024-06-15-preview/InternetGateways_Delete.json
 */
async function internetGatewaysDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.internetGateways.delete("example-rg", "example-internetGateway");
}

async function main() {
  await internetGatewaysDeleteMaximumSetGen();
}

main().catch(console.error);
