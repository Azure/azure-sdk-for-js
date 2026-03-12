// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List AssessmentProjectSummary resources by AssessmentProject
 *
 * @summary List AssessmentProjectSummary resources by AssessmentProject
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentProjectSummaryOperations_ListByAssessmentProject_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessmentProjectSummaryOperationsListByAssessmentProjectMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "piyushapp1";
  const projectName = "PiyushApp15328project";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.assessmentProjectSummaryOperations.listByAssessmentProject(
    resourceGroupName,
    projectName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await assessmentProjectSummaryOperationsListByAssessmentProjectMaximumSetGen();
}

main().catch(console.error);
