// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a ImportCollector
 *
 * @summary Create a ImportCollector
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/ImportCollectorsOperations_Create_MaximumSet_Gen.json
 */

import {
  ImportCollector,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function importCollectorsOperationsCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawRG";
  const projectName = "app18700project";
  const importCollectorName = "importCollectore7d5";
  const resource: ImportCollector = {
    discoverySiteId:
      "/subscriptions/4bd2aa0f-2bd2-4d67-91a8-5a4533d58600/resourcegroups/ayagrawRG/providers/microsoft.offazure/importsites/actualSEA37d4importSite",
    provisioningState: "Succeeded",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.importCollectorsOperations.beginCreateAndWait(
    resourceGroupName,
    projectName,
    importCollectorName,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await importCollectorsOperationsCreateMaximumSetGen();
}

main().catch(console.error);
