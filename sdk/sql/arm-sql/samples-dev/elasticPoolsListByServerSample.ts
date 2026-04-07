// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all elastic pools in a server.
 *
 * @summary gets all elastic pools in a server.
 * x-ms-original-file: 2025-02-01-preview/ElasticPoolListByServer.json
 */
async function getAllElasticPoolsInAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticPools.listByServer(
    "sqlcrudtest-2369",
    "sqlcrudtest-8069",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllElasticPoolsInAServer();
}

main().catch(console.error);
