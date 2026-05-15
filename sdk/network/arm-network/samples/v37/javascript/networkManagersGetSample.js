// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Network Manager.
 *
 * @summary gets the specified Network Manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerGet.json
 */
async function networkManagersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagers.get("rg1", "testNetworkManager");
  console.log(result);
}

async function main() {
  await networkManagersGet();
}

main().catch(console.error);
