// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DbSystem
 *
 * @summary delete a DbSystem
 * x-ms-original-file: 2026-06-01/DbSystems_Delete_MaximumSet_Gen.json
 */
async function dbSystemsDeleteMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.dbSystems.delete("rgopenapi", "resource1");
}

async function main() {
  await dbSystemsDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
