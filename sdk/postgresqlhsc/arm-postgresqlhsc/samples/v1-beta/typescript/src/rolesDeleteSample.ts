// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a cluster role.
 *
 * @summary deletes a cluster role.
 * x-ms-original-file: 2023-03-02-preview/RoleDelete.json
 */
async function roleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.roles.delete("TestGroup", "pgtestsvc4", "role1");
}

async function main(): Promise<void> {
  await roleDelete();
}

main().catch(console.error);
