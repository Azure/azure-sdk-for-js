// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get all available options for the properties of an assessment on a project.
 *
 * @summary Get all available options for the properties of an assessment on a project.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/AssessmentOptions_Get.json
 */
async function assessmentOptionsGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const assessmentOptionsName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.projects.assessmentOptions(
    resourceGroupName,
    projectName,
    assessmentOptionsName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentOptionsGet();
}

main().catch(console.error);
