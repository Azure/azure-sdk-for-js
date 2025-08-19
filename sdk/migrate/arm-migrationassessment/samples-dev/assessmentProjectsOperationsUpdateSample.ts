// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AssessmentProjectUpdate,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a AssessmentProject
 *
 * @summary Update a AssessmentProject
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessmentProjectsOperations_Update_MaximumSet_Gen.json
 */
async function assessmentProjectsOperationsUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "sakanwar";
  const projectName = "sakanwar1204project";
  const properties: AssessmentProjectUpdate = {
    assessmentSolutionId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/sakanwar/providers/Microsoft.Storage/storageAccounts/sakanwar1204usa",
    customerStorageAccountArmId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourceGroups/sakanwar/providers/Microsoft.Storage/storageAccounts/sakanwar1204usa",
    customerWorkspaceId: undefined,
    customerWorkspaceLocation: undefined,
    projectStatus: "Active",
    provisioningState: "Succeeded",
    publicNetworkAccess: "Disabled",
    tags: { migrateProject: "sakanwar-PE-SEA" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessmentProjectsOperations.beginUpdateAndWait(
    resourceGroupName,
    projectName,
    properties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentProjectsOperationsUpdateMaximumSetGen();
}

main().catch(console.error);
