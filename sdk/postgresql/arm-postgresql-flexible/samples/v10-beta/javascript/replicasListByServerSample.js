// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all read replicas of a server.
 *
 * @summary lists all read replicas of a server.
 * x-ms-original-file: 2026-01-01-preview/ReplicasListByServer.json
 */
async function listAllReadReplicasOfAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicas.listByServer("exampleresourcegroup", "exampleserver")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllReadReplicasOfAServer();
}

main().catch(console.error);
