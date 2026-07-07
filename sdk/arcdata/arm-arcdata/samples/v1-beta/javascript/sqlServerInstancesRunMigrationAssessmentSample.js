// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to runs migration assessment for SQL Server instance
 *
 * @summary runs migration assessment for SQL Server instance
 * x-ms-original-file: 2026-03-01-preview/RunMigrationAssessmentSqlServerInstance.json
 */
async function triggerMigrationAssessmentRunOnSqlServerInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.runMigrationAssessment("testrg", "testsqlserver");
  console.log(result);
}

async function main() {
  await triggerMigrationAssessmentRunOnSqlServerInstance();
}

main().catch(console.error);
