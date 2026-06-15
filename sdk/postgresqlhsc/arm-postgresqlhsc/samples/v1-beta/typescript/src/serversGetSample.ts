// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a server in cluster.
 *
 * @summary gets information about a server in cluster.
 * x-ms-original-file: 2023-03-02-preview/ServerGet.json
 */
async function getTheServerOfCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.servers.get("TestGroup", "testcluster1", "testcluster1-c");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheServerOfCluster();
}

main().catch(console.error);
