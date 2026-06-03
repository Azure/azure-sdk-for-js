// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource for cluster.
 *
 * @summary gets a private link resource for cluster.
 * x-ms-original-file: 2023-03-02-preview/PrivateLinkResourcesGet.json
 */
async function getsAPrivateLinkResourceForCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("TestGroup", "testcluster", "plr");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAPrivateLinkResourceForCluster();
}

main().catch(console.error);
