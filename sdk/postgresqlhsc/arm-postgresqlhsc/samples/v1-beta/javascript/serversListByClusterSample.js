// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists servers of a cluster.
 *
 * @summary lists servers of a cluster.
 * x-ms-original-file: 2023-03-02-preview/ServerListByCluster.json
 */
async function listServersOfTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.servers.listByCluster("TestGroup", "testcluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServersOfTheCluster();
}

main().catch(console.error);
