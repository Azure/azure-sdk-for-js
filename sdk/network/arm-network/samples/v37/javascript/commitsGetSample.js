// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified commit.
 *
 * @summary gets the specified commit.
 * x-ms-original-file: 2025-07-01/NetworkManagerCommitGet.json
 */
async function getNetworkManagerCommit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.commits.get("myResourceGroup", "testNetworkManager", "myTestCommit");
  console.log(result);
}

async function main() {
  await getNetworkManagerCommit();
}

main().catch(console.error);
