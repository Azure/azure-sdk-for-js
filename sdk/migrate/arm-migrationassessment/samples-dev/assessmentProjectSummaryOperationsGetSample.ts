// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a AssessmentProjectSummary
 *
 * @summary Get a AssessmentProjectSummary
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentProjectSummaryOperations_Get_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessmentProjectSummaryOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "piyushapp1";
  const projectName = "PiyushApp15328project";
  const projectSummaryName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessmentProjectSummaryOperations.get(
    resourceGroupName,
    projectName,
    projectSummaryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentProjectSummaryOperationsGetMaximumSetGen();
}

main().catch(console.error);
