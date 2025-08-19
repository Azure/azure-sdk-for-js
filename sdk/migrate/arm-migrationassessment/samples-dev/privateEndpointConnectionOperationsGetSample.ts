// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a PrivateEndpointConnection
 *
 * @summary Get a PrivateEndpointConnection
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/PrivateEndpointConnectionOperations_Get_MaximumSet_Gen.json
 */
async function privateEndpointConnectionOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "sakanwar";
  const projectName = "sakanwar1204project";
  const privateEndpointConnectionName =
    "sakanwar1204project1634pe.bf42f8a1-09f5-4ee4-aea6-a019cc60f9d7";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.privateEndpointConnectionOperations.get(
    resourceGroupName,
    projectName,
    privateEndpointConnectionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateEndpointConnectionOperationsGetMaximumSetGen();
}

main().catch(console.error);
