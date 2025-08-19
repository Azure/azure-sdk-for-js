// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List PrivateEndpointConnection resources by AssessmentProject
 *
 * @summary List PrivateEndpointConnection resources by AssessmentProject
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/PrivateEndpointConnectionOperations_ListByAssessmentProject_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateEndpointConnectionOperationsListByAssessmentProjectMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "sakanwar";
  const projectName = "sakanwar1204project";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.privateEndpointConnectionOperations.listByAssessmentProject(
    resourceGroupName,
    projectName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await privateEndpointConnectionOperationsListByAssessmentProjectMaximumSetGen();
}

main().catch(console.error);
