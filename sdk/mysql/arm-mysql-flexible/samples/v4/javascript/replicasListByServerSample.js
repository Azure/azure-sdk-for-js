// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the replicas for a given server.
 *
 * @summary list all the replicas for a given server.
 * x-ms-original-file: 2024-12-30/ReplicasListByServer.json
 */
async function listReplicasForAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicas.listByServer("TestGroup", "mysqltestserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listReplicasForAServer();
}

main().catch(console.error);
