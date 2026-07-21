// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all commits for the specified network manager.
 *
 * @summary lists all commits for the specified network manager.
 * x-ms-original-file: 2025-07-01/NetworkManagerCommitList.json
 */
async function listNetworkManagerCommit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.commits.list("myResourceGroup", "testNetworkManager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkManagerCommit();
}

main().catch(console.error);
