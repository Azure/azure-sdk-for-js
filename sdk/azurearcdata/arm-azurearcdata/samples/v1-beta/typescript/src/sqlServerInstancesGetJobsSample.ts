// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets job details for sql arc resource asynchronously
 *
 * @summary gets job details for sql arc resource asynchronously
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceJobs.json
 */
async function retrievesArcSQLServerInstanceJobsStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getJobs("testrg", "testsqlserver", {
    sqlServerInstanceJobsRequest: { featureName: "MigrationAssessment", jobType: "Ondemand" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await retrievesArcSQLServerInstanceJobsStatus();
}

main().catch(console.error);
