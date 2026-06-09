// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a cluster role.
 *
 * @summary deletes a cluster role.
 * x-ms-original-file: 2023-03-02-preview/RoleDelete.json
 */
async function roleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  await client.roles.delete("TestGroup", "pgtestsvc4", "role1");
}

async function main() {
  await roleDelete();
}

main().catch(console.error);
