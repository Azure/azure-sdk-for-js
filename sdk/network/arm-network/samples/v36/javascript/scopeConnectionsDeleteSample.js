// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete the pending scope connection created by this network manager.
 *
 * @summary Delete the pending scope connection created by this network manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerScopeConnectionDelete.json
 */
async function deleteNetworkManagerScopeConnection() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const scopeConnectionName = "TestScopeConnection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.scopeConnections.delete(
    resourceGroupName,
    networkManagerName,
    scopeConnectionName,
  );
  console.log(result);
}

async function main() {
  await deleteNetworkManagerScopeConnection();
}

main().catch(console.error);
