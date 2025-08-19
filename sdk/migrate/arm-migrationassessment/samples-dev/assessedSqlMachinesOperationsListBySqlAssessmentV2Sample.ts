// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AssessedSqlMachinesOperationsListBySqlAssessmentV2OptionalParams,
  AzureMigrateAssessmentService,
} from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List AssessedSqlMachine resources by SqlAssessmentV2
 *
 * @summary List AssessedSqlMachine resources by SqlAssessmentV2
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessedSqlMachinesOperations_ListBySqlAssessmentV2_MaximumSet_Gen.json
 */
async function assessedSqlMachinesOperationsListBySqlAssessmentV2MaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const filter = "(contains(Properties/DisplayName,'SQLHAVM17'))";
  const pageSize = 23;
  const continuationToken = undefined;
  const totalRecordCount = 1;
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const options: AssessedSqlMachinesOperationsListBySqlAssessmentV2OptionalParams =
    { filter, pageSize, continuationToken, totalRecordCount };
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.assessedSqlMachinesOperations.listBySqlAssessmentV2(
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
  await assessedSqlMachinesOperationsListBySqlAssessmentV2MaximumSetGen();
}

main().catch(console.error);
