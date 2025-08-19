// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a AvsAssessedMachine
 *
 * @summary Get a AvsAssessedMachine
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AvsAssessedMachinesOperations_Get_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function avsAssessedMachinesOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const assessmentName = "asm2";
  const avsAssessedMachineName = "b6d6fc6f-796f-4c16-96af-a6d22e0f12f7";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.avsAssessedMachinesOperations.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    avsAssessedMachineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await avsAssessedMachinesOperationsGetMaximumSetGen();
}

main().catch(console.error);
