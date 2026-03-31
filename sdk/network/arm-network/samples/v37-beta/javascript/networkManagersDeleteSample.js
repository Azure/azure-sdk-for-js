// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a network manager.
 *
 * @summary deletes a network manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerDelete.json
 */
async function networkManagersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkManagers.delete("rg1", "testNetworkManager", { force: false });
}

async function main() {
  await networkManagersDelete();
}

main().catch(console.error);
