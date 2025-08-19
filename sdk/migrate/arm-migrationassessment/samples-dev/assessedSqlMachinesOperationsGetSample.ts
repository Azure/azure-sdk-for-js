// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a AssessedSqlMachine
 *
 * @summary Get a AssessedSqlMachine
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessedSqlMachinesOperations_Get_MaximumSet_Gen.json
 */
async function assessedSqlMachinesOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const assessedSqlMachineName = "cc64c9dc-b38e-435d-85ad-d509df5d92c6";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessedSqlMachinesOperations.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    assessedSqlMachineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessedSqlMachinesOperationsGetMaximumSetGen();
}

main().catch(console.error);
