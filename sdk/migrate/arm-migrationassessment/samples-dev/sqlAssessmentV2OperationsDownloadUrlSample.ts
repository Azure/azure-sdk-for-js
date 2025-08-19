// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateAssessmentService } from "@azure/arm-migrationassessment";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the URL for downloading the assessment in a report format.
 *
 * @summary Get the URL for downloading the assessment in a report format.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/AssessmentProjects/stable/2023-03-15/examples/SqlAssessmentV2Operations_DownloadUrl_MaximumSet_Gen.json
 */
async function sqlAssessmentV2OperationsDownloadUrlMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] ||
    "4bd2aa0f-2bd2-4d67-91a8-5a4533d58600";
  const resourceGroupName =
    process.env["MIGRATE_RESOURCE_GROUP"] || "rgmigrate";
  const projectName = "fci-test6904project";
  const groupName = "test_fci_hadr";
  const assessmentName = "test_swagger_1";
  const body: Record<string, unknown> = {};
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateAssessmentService(credential, subscriptionId);
  const result = await client.sqlAssessmentV2Operations.beginDownloadUrlAndWait(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sqlAssessmentV2OperationsDownloadUrlMaximumSetGen();
}

main().catch(console.error);
