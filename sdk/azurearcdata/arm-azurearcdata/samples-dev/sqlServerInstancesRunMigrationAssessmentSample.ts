// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to runs migration assessment for SQL Server instance
 *
 * @summary runs migration assessment for SQL Server instance
 * x-ms-original-file: 2026-03-01-preview/RunMigrationAssessmentSqlServerInstance.json
 */
async function triggerMigrationAssessmentRunOnSqlServerInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.runMigrationAssessment("testrg", "testsqlserver");
  console.log(result);
}

async function main(): Promise<void> {
  await triggerMigrationAssessmentRunOnSqlServerInstance();
}

main().catch(console.error);
