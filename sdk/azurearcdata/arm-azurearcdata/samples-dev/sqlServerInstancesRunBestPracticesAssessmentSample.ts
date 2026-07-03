// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the request to run SQL best practices assessment.
 *
 * @summary the request to run SQL best practices assessment.
 * x-ms-original-file: 2026-03-01-preview/RunBestPracticesAssessmentSqlServerInstance.json
 */
async function triggerBestPracticesAssessmentRunOnSqlServerInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.runBestPracticesAssessment(
    "testrg",
    "testsqlserver",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggerBestPracticesAssessmentRunOnSqlServerInstance();
}

main().catch(console.error);
