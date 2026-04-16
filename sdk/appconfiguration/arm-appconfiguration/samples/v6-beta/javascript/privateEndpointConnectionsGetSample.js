// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint connection associated with the configuration store.
 *
 * @summary gets the specified private endpoint connection associated with the configuration store.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetPrivateEndpointConnection.json
 */
async function privateEndpointConnectionGetConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "contoso",
    "myConnection",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionGetConnection();
}

main().catch(console.error);
