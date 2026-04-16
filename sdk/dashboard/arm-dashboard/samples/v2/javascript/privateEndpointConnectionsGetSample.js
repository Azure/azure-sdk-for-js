// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get private endpoint connections.
 *
 * @summary get private endpoint connections.
 * x-ms-original-file: 2025-08-01/PrivateEndpointConnections_Get.json
 */
async function privateEndpointConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.get(
    "myResourceGroup",
    "myWorkspace",
    "myConnection",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsGet();
}

main().catch(console.error);
