// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves SQL best practices assessment results for the SQL Server instance.
 *
 * @summary retrieves SQL best practices assessment results for the SQL Server instance.
 * x-ms-original-file: 2026-03-01-preview/GetSqlServerInstanceBpa.json
 */
async function retrievesArcSQLServerBestPracticesAssessmentResults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.getBestPracticesAssessment(
    "testrg",
    "testsqlserver",
    {
      queryType: "Basic",
      reportId: "ad43a05f-efed-448a-ae53-5e4abd29068f",
      reportType: "AssessmentSummary",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await retrievesArcSQLServerBestPracticesAssessmentResults();
}

main().catch(console.error);
