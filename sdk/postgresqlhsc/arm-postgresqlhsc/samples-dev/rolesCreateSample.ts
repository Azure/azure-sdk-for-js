// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new role or updates an existing role.
 *
 * @summary creates a new role or updates an existing role.
 * x-ms-original-file: 2023-03-02-preview/RoleCreate.json
 */
async function roleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.roles.create("TestGroup", "pgtestsvc4", "role1", {
    password: "password",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await roleCreate();
}

main().catch(console.error);
