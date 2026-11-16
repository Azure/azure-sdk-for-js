// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DbVersion
 *
 * @summary get a DbVersion
 * x-ms-original-file: 2026-06-01/DbVersions_Get_MaximumSet_Gen.json
 */
async function dbVersionsGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.dbVersions.get("eastus", "resource1");
  console.log(result);
}

async function main() {
  await dbVersionsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
