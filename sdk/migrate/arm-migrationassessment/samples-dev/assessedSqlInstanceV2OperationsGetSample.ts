// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a AssessedSqlInstanceV2
 *
 * @summary Get a AssessedSqlInstanceV2
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessedSqlInstanceV2Operations_Get_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessedSqlInstanceV2OperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const assessedSqlInstanceName = "3c6574cf-b4e1-4fdc-93db-6bbcc570dda2";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessedSqlInstanceV2Operations.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    assessedSqlInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessedSqlInstanceV2OperationsGetMaximumSetGen();
}

main().catch(console.error);
