// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AvsAssessedMachinesOperationsListByAvsAssessmentOptionalParams,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List AvsAssessedMachine resources by AvsAssessment
 *
 * @summary List AvsAssessedMachine resources by AvsAssessment
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AvsAssessedMachinesOperations_ListByAvsAssessment_MaximumSet_Gen.json
 */
async function avsAssessedMachinesOperationsListByAvsAssessmentMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "ayagrawrg";
  const filter = "ujmwhhuloficljxcjyc";
  const pageSize = 6;
  const continuationToken = "qwrjeiukbcicfrkqlqsfukfc";
  const totalRecordCount = 19;
  const projectName = "app18700project";
  const groupName = "kuchatur-test";
  const assessmentName = "asm2";
  const options: AvsAssessedMachinesOperationsListByAvsAssessmentOptionalParams =
    { filter, pageSize, continuationToken, totalRecordCount };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.avsAssessedMachinesOperations.listByAvsAssessment(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await avsAssessedMachinesOperationsListByAvsAssessmentMaximumSetGen();
}

main().catch(console.error);
