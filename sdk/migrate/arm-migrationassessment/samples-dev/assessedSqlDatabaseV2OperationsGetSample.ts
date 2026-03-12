// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a AssessedSqlDatabaseV2
 *
 * @summary Get a AssessedSqlDatabaseV2
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/AssessedSqlDatabaseV2Operations_Get_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessedSqlDatabaseV2OperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const assessedSqlDatabaseName = "858eb860-9e07-417c-91b6-bca1bffb3bf5";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.assessedSqlDatabaseV2Operations.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    assessedSqlDatabaseName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessedSqlDatabaseV2OperationsGetMaximumSetGen();
}

main().catch(console.error);
