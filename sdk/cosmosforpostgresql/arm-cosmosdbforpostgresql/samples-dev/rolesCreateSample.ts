// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new role or updates an existing role.
 *
 * @summary Creates a new role or updates an existing role.
 * x-ms-original-file: specification/postgresqlhsc/resource-manager/Microsoft.DBforPostgreSQL/preview/2023-03-02-preview/examples/RoleCreate.json
 */

import type { Role } from "@azure/arm-cosmosdbforpostgresql";
import { CosmosDBForPostgreSQL } from "@azure/arm-cosmosdbforpostgresql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function roleCreate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSFORPOSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSFORPOSTGRESQL_RESOURCE_GROUP"] || "TestGroup";
  const clusterName = "pgtestsvc4";
  const roleName = "role1";
  const parameters: Role = { password: "password" };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBForPostgreSQL(credential, subscriptionId);
  const result = await client.roles.beginCreateAndWait(
    resourceGroupName,
    clusterName,
    roleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await roleCreate();
}

main().catch(console.error);
