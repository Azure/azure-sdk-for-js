// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets jobs status details for sql arc resource
 *
 * @summary gets jobs status details for sql arc resource
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceJobsStatus.json
 */
async function retrievesArcSQLServerInstanceJobsStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getJobsStatus("testrg", "testsqlserver", {
    sqlServerInstanceJobsStatusRequest: { featureName: "MigrationAssessment", jobType: "Ondemand" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await retrievesArcSQLServerInstanceJobsStatus();
}

main().catch(console.error);
