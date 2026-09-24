// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to perform Lifecycle Management Action on Autonomous Database
 *
 * @summary perform Lifecycle Management Action on Autonomous Database
 * x-ms-original-file: 2026-06-01/AutonomousDatabases_Action_MaximumSet_Gen.json
 */
async function autonomousDatabasesActionMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabases.action("rgopenapi", "resource1", {
    action: "Start",
  });
  console.log(result);
}

async function main() {
  await autonomousDatabasesActionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
