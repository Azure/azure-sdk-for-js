// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove private endpoint connection with the specified name
 *
 * @summary remove private endpoint connection with the specified name
 * x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsDelete.json
 */
async function removeAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "myResourceGroup",
    "myWorkspace",
    "myWorkspace.23456789-1111-1111-1111-111111111111",
  );
}

async function main() {
  await removeAPrivateEndpointConnection();
}

main().catch(console.error);
