// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a AssessmentProject
 *
 * @summary Delete a AssessmentProject
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentProjectsOperations_Delete_MaximumSet_Gen.json
 */
async function assessmentProjectsOperationsDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "A926B99C-7F4C-4556-871E-20CB8C6ADB56";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "zqrsyncwahgydqvwuchkfd";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessmentProjectsOperations.delete(
    resourceGroupName,
    projectName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentProjectsOperationsDeleteMaximumSetGen();
}

main().catch(console.error);
