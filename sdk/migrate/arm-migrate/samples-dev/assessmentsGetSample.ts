// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an existing assessment with the specified name. Returns a json object of type 'assessment' as specified in Models section.
 *
 * @summary Get an existing assessment with the specified name. Returns a json object of type 'assessment' as specified in Models section.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/Assessments_Get.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessmentsGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const groupName = "Test1";
  const assessmentName = "assessment_5_9_2019_16_22_14";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.assessments.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessmentsGet();
}

main().catch(console.error);
