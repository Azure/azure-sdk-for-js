// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a network manager connection on this management group.
 *
 * @summary create a network manager connection on this management group.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionManagementGroupPut.json
 */
async function createOrUpdateManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const result = await client.managementGroupNetworkManagerConnections.createOrUpdate(
    "managementGroupA",
    "TestNMConnection",
    {
      networkManagerId:
        "/subscriptions/22222222-2222-2222-2222-222222222222/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager",
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
