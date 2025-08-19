// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List Assessment resources by Group
 *
 * @summary List Assessment resources by Group
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentsOperations_ListByGroup_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessmentsOperationsListByGroupMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.assessmentsOperations.listByGroup(
    resourceGroupName,
    projectName,
    groupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await assessmentsOperationsListByGroupMaximumSetGen();
}

main().catch(console.error);
