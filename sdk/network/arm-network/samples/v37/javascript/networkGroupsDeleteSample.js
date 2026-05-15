// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a network group.
 *
 * @summary deletes a network group.
 * x-ms-original-file: 2025-05-01/NetworkManagerGroupDelete.json
 */
async function networkGroupsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.networkGroups.delete("rg1", "testNetworkManager", "testNetworkGroup", {
    force: false,
  });
}

async function main() {
  await networkGroupsDelete();
}

main().catch(console.error);
