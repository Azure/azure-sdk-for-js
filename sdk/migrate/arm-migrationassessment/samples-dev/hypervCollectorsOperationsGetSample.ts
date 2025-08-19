// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a HypervCollector
 *
 * @summary Get a HypervCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/HypervCollectorsOperations_Get_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function hypervCollectorsOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawRG";
  const projectName = "app18700project";
  const hypervCollectorName = "test-697cecollector";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.hypervCollectorsOperations.get(
    resourceGroupName,
    projectName,
    hypervCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hypervCollectorsOperationsGetMaximumSetGen();
}

main().catch(console.error);
