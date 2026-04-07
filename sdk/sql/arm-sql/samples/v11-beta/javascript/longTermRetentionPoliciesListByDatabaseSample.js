// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a database's long term retention policy.
 *
 * @summary gets a database's long term retention policy.
 * x-ms-original-file: 2025-02-01-preview/LongTermRetentionPolicyListByDatabase.json
 */
async function getTheLongTermRetentionPolicyForTheDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionPolicies.listByDatabase(
    "resourceGroup",
    "testserver",
    "testDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheLongTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
