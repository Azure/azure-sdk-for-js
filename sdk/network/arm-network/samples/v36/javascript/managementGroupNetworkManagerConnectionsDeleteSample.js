// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete specified pending connection created by this management group.
 *
 * @summary Delete specified pending connection created by this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectionManagementGroupDelete.json
 */
async function deleteManagementGroupNetworkManagerConnection() {
  const managementGroupId = "managementGroupA";
  const networkManagerConnectionName = "TestNMConnection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential);
  const result = await client.managementGroupNetworkManagerConnections.delete(
    managementGroupId,
    networkManagerConnectionName,
  );
  console.log(result);
}

async function main() {
  await deleteManagementGroupNetworkManagerConnection();
}

main().catch(console.error);
