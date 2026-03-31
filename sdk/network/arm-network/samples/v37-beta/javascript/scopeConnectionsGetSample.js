// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get specified scope connection created by this Network Manager.
 *
 * @summary get specified scope connection created by this Network Manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerScopeConnectionGet.json
 */
async function getNetworkManagerScopeConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.scopeConnections.get(
    "rg1",
    "testNetworkManager",
    "TestScopeConnection",
  );
  console.log(result);
}

async function main() {
  await getNetworkManagerScopeConnection();
}

main().catch(console.error);
