// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List AssessedMachine resources by Assessment
 *
 * @summary List AssessedMachine resources by Assessment
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessedMachinesOperations_ListByAssessment_MaximumSet_Gen.json
 */

import {
  AssessedMachinesOperationsListByAssessmentOptionalParams,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessedMachinesOperationsListByAssessmentMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "D8E1C413-E65F-40C0-8A7E-743D6B7A6AE9";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgopenapi";
  const filter = "sbkdovsfqldhdb";
  const pageSize = 10;
  const continuationToken = "hbyseetshbplfkjmpjhsiurqgt";
  const totalRecordCount = 25;
  const projectName = "sloqixzfjk";
  const groupName = "kjuepxerwseq";
  const assessmentName = "rhzcmubwrrkhtocsibu";
  const options: AssessedMachinesOperationsListByAssessmentOptionalParams = {
    filter,
    pageSize,
    continuationToken,
    totalRecordCount,
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.assessedMachinesOperations.listByAssessment(
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
  await assessedMachinesOperationsListByAssessmentMaximumSetGen();
}

main().catch(console.error);
