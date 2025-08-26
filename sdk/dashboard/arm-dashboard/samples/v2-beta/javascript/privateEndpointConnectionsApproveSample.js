// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DashboardManagementClient } = require("@azure/arm-dashboard");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to manual approve private endpoint connection
 *
 * @summary manual approve private endpoint connection
 * x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Approve.json
 */
async function privateEndpointConnectionsApprove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.approve(
    "myResourceGroup",
    "myWorkspace",
    "myConnection",
  );
  console.log(result);
}

async function main() {
  await privateEndpointConnectionsApprove();
}

main().catch(console.error);
