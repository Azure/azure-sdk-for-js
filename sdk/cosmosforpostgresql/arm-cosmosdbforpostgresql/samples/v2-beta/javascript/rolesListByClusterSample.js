// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the roles in a given cluster.
 *
 * @summary list all the roles in a given cluster.
 * x-ms-original-file: 2023-03-02-preview/RoleListByCluster.json
 */
async function roleList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roles.listByCluster("TestGroup", "pgtestsvc4")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await roleList();
}

main().catch(console.error);
