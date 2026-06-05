// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new database.
 *
 * @summary creates a new database.
 * x-ms-original-file: 2026-01-01-preview/DatabasesCreate.json
 */
async function createADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.databases.create(
    "exampleresourcegroup",
    "exampleserver",
    "exampledatabase",
    { charset: "utf8", collation: "en_US.utf8" },
  );
  console.log(result);
}

async function main() {
  await createADatabase();
}

main().catch(console.error);
