// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an EdgeConnector.
 *
 * @summary creates or updates an EdgeConnector.
 * x-ms-original-file: 2026-01-15-preview/EdgeConnectors_Create.json
 */
async function edgeConnectorsCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.edgeConnectors.create("example-rg", "example-edgeConnector", {
    location: "eastus",
    tags: { environment: "production", site: "factory-floor" },
    properties: { version: "1.0.0", connectivityModel: "direct" },
  });
  console.log(result);
}

async function main() {
  await edgeConnectorsCreateMaximumSetGen();
}

main().catch(console.error);
