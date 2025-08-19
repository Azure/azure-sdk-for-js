// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a Machine
 *
 * @summary Get a Machine
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/MachinesOperations_Get_MaximumSet_Gen.json
 */
async function machinesOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const machineName = "55082b89-99e2-4c40-b63f-d4f4d6ba961d";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.machinesOperations.get(
    resourceGroupName,
    projectName,
    machineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await machinesOperationsGetMaximumSetGen();
}

main().catch(console.error);
