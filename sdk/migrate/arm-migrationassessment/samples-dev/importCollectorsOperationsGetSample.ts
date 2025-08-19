// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a ImportCollector
 *
 * @summary Get a ImportCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/ImportCollectorsOperations_Get_MaximumSet_Gen.json
 */
async function importCollectorsOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawRG";
  const projectName = "app18700project";
  const importCollectorName = "importCollectore7d5";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.importCollectorsOperations.get(
    resourceGroupName,
    projectName,
    importCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await importCollectorsOperationsGetMaximumSetGen();
}

main().catch(console.error);
