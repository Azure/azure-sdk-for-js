// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a AvsAssessment
 *
 * @summary Delete a AvsAssessment
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AvsAssessmentsOperations_Delete_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function avsAssessmentsOperationsDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const assessmentName = "asm2";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.avsAssessmentsOperations.delete(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await avsAssessmentsOperationsDeleteMaximumSetGen();
}

main().catch(console.error);
