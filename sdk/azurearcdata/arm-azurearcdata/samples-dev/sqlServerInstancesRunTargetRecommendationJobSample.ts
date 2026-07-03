// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a target recommendation job for the SQL Server instance. Only one job can run at a time. If the previous job is in a non-terminal state (NotStarted or InProgress), calling this operation again returns the existing job status without creating a new job. A new job is created only when the previous job has reached a terminal state (Succeeded or Failed). This operation does not return recommendations directly. Use the GetTargetRecommendationReports API to check the job status and retrieve the target recommendation report if the jobStatus is Succeeded.
 *
 * @summary starts a target recommendation job for the SQL Server instance. Only one job can run at a time. If the previous job is in a non-terminal state (NotStarted or InProgress), calling this operation again returns the existing job status without creating a new job. A new job is created only when the previous job has reached a terminal state (Succeeded or Failed). This operation does not return recommendations directly. Use the GetTargetRecommendationReports API to check the job status and retrieve the target recommendation report if the jobStatus is Succeeded.
 * x-ms-original-file: 2026-03-01-preview/RunTargetRecommendationJobSqlServerInstance.json
 */
async function triggerTargetRecommendationJobOnSqlServerInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerInstances.runTargetRecommendationJob(
    "testrg",
    "testsqlserver",
    {
      sqlServerInstanceRunTargetRecommendationJobRequest: {
        includeFileLevelRequirements: false,
        lookbackPeriodInDays: 30,
        percentile: 95,
        resourceUpdateMode: "UpdateAllTargetRecommendationDetails",
        targetLocation: "westus",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggerTargetRecommendationJobOnSqlServerInstance();
}

main().catch(console.error);
