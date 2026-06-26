// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a cluster role.
 *
 * @summary gets information about a cluster role.
 * x-ms-original-file: 2023-03-02-preview/RoleGet.json
 */
async function getTheRoleOfTheCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.roles.get("TestGroup", "pgtestsvc4", "role1");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheRoleOfTheCluster();
}

main().catch(console.error);
