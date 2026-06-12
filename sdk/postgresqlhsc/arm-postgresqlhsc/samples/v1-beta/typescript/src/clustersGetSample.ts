// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a cluster such as compute and storage configuration and cluster lifecycle metadata such as cluster creation date and time.
 *
 * @summary gets information about a cluster such as compute and storage configuration and cluster lifecycle metadata such as cluster creation date and time.
 * x-ms-original-file: 2023-03-02-preview/ClusterGet.json
 */
async function getTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.get("TestGroup", "testcluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheCluster();
}

main().catch(console.error);
