// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete specified pending connection created by this management group.
 *
 * @summary delete specified pending connection created by this management group.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionManagementGroupDelete.json
 */
async function deleteManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  await client.managementGroupNetworkManagerConnections.delete(
    "managementGroupA",
    "TestNMConnection",
  );
}

async function main() {
  await deleteManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
