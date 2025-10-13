// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a database.
 *
 * @summary deletes a database.
 * x-ms-original-file: 2024-12-30/DatabaseDelete.json
 */
async function deleteADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.databases.delete("TestGroup", "testserver", "db1");
}

async function main() {
  await deleteADatabase();
}

main().catch(console.error);
