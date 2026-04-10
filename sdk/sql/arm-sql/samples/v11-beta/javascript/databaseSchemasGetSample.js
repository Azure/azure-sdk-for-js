// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get database schema
 *
 * @summary get database schema
 * x-ms-original-file: 2025-02-01-preview/DatabaseSchemaGet.json
 */
async function getDatabaseSchema() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseSchemas.get("myRG", "serverName", "myDatabase", "dbo");
  console.log(result);
}

async function main() {
  await getDatabaseSchema();
}

main().catch(console.error);
