// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a SqlAssessmentV2Summary
 *
 * @summary Get a SqlAssessmentV2Summary
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/SqlAssessmentV2SummaryOperations_Get_MaximumSet_Gen.json
 */

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function sqlAssessmentV2SummaryOperationsGetMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const summaryName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.sqlAssessmentV2SummaryOperations.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    summaryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sqlAssessmentV2SummaryOperationsGetMaximumSetGen();
}

main().catch(console.error);
