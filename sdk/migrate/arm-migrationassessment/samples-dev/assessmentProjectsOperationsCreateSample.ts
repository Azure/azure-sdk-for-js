// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a AssessmentProject
 *
 * @summary Create a AssessmentProject
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentProjectsOperations_Create_MaximumSet_Gen.json
 */

import {
  AssessmentProject,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessmentProjectsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "sakanwar";
  const projectName = "sakanwar1204project";
  const resource: AssessmentProject = {
    assessmentSolutionId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/sakanwar/providers/Microsoft.Storage/storageAccounts/sakanwar1204usa",
    customerStorageAccountArmId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/sakanwar/providers/Microsoft.Storage/storageAccounts/sakanwar1204usa",
    customerWorkspaceId: undefined,
    customerWorkspaceLocation: undefined,
    location: "southeastasia",
    projectStatus: "Active",
    provisioningState: "Succeeded",
    publicNetworkAccess: "Disabled",
    tags: { migrateProject: "sakanwar-PE-SEA" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessmentProjectsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentProjectsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
