// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops compute on all cluster nodes.
 *
 * @summary stops compute on all cluster nodes.
 * x-ms-original-file: 2023-03-02-preview/ClusterStop.json
 */
async function stopAllServersInTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.clusters.stop("TestGroup", "testcluster1");
}

async function main(): Promise<void> {
  await stopAllServersInTheCluster();
}

main().catch(console.error);
