// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a commit.
 *
 * @summary deletes a commit.
 * x-ms-original-file: 2025-07-01/NetworkManagerCommitDelete.json
 */
async function deleteNetworkManagerCommit(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.commits.delete("myResourceGroup", "testNetworkManager", "myTestCommit");
}

async function main(): Promise<void> {
  await deleteNetworkManagerCommit();
}

main().catch(console.error);
