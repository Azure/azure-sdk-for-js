// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the request to run migration readiness assessment asynchronously.
 *
 * @summary the request to run migration readiness assessment asynchronously.
 * x-ms-original-file: 2026-03-01-preview/RunMigrationReadinessAssessmentSqlServerInstance.json
 */
async function runMigrationReadinessAssessmentOnSqlServerInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.runMigrationReadinessAssessment(
    "testrg",
    "testsqlserver",
  );
  console.log(result);
}

async function main() {
  await runMigrationReadinessAssessmentOnSqlServerInstance();
}

main().catch(console.error);
