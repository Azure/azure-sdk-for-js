// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2024-12-30/DatabaseCreate.json
 */
async function createADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate("TestGroup", "testserver", "db1", {
    properties: { charset: "utf8", collation: "utf8_general_ci" },
  });
  console.log(result);
}

async function main() {
  await createADatabase();
}

main().catch(console.error);
