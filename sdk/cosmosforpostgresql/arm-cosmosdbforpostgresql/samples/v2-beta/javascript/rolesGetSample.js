// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBForPostgreSQL } = require("@azure/arm-cosmosdbforpostgresql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a cluster role.
 *
 * @summary gets information about a cluster role.
 * x-ms-original-file: 2023-03-02-preview/RoleGet.json
 */
async function getTheRoleOfTheCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.roles.get("TestGroup", "pgtestsvc4", "role1");
  console.log(result);
}

async function main() {
  await getTheRoleOfTheCluster();
}

main().catch(console.error);
