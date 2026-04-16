// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete private endpoint connection
 *
 * @summary delete private endpoint connection
 * x-ms-original-file: 2025-08-01/PrivateEndpointConnections_Delete.json
 */
async function privateEndpointConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete("myResourceGroup", "myWorkspace", "myConnection");
}

async function main() {
  await privateEndpointConnectionsDelete();
}

main().catch(console.error);
