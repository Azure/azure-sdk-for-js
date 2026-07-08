// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all commits for the specified network manager.
 *
 * @summary lists all commits for the specified network manager.
 * x-ms-original-file: 2025-07-01/NetworkManagerCommitList.json
 */
async function listNetworkManagerCommit() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.commits.list("myResourceGroup", "testNetworkManager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNetworkManagerCommit();
}

main().catch(console.error);
