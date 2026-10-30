// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DatabaseEdition
 *
 * @summary get a DatabaseEdition
 * x-ms-original-file: 2026-06-01/DatabaseEditions_Get_MaximumSet_Gen.json
 */
async function databaseEditionsGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.databaseEditions.get("eastus", "resource1");
  console.log(result);
}

async function main() {
  await databaseEditionsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
