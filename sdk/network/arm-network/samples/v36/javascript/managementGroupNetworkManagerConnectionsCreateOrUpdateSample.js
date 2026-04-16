// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create a network manager connection on this management group.
 *
 * @summary Create a network manager connection on this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectionManagementGroupPut.json
 */
async function createOrUpdateManagementGroupNetworkManagerConnection() {
  const managementGroupId = "managementGroupA";
  const networkManagerConnectionName = "TestNMConnection";
  const parameters = {
    networkManagerId:
      "/subscriptions/subscriptionC/resourceGroup/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const result = await client.managementGroupNetworkManagerConnections.createOrUpdate(
    managementGroupId,
    networkManagerConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
