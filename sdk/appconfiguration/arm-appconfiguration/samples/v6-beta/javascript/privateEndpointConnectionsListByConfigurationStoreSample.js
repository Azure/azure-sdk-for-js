// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private endpoint connections for a configuration store.
 *
 * @summary lists all private endpoint connections for a configuration store.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresListPrivateEndpointConnections.json
 */
async function privateEndpointConnectionList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByConfigurationStore(
    "myResourceGroup",
    "contoso",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await privateEndpointConnectionList();
}

main().catch(console.error);
