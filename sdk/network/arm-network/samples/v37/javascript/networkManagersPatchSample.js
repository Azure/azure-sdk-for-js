// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch NetworkManager.
 *
 * @summary patch NetworkManager.
 * x-ms-original-file: 2025-05-01/NetworkManagerPatch.json
 */
async function networkManagesPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkManagers.patch("rg1", "testNetworkManager", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await networkManagesPatch();
}

main().catch(console.error);
