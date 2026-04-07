// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resumes a database.
 *
 * @summary resumes a database.
 * x-ms-original-file: 2025-02-01-preview/ResumeDatabase.json
 */
async function resumesADatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databases.resume("Default-SQL-SouthEastAsia", "testsvr", "testdwdb");
  console.log(result);
}

async function main() {
  await resumesADatabase();
}

main().catch(console.error);
