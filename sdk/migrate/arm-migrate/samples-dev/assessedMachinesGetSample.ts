// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an assessed machine with its size & cost estimate that was evaluated in the specified assessment.
 *
 * @summary Get an assessed machine with its size & cost estimate that was evaluated in the specified assessment.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/AssessedMachines_Get.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function assessedMachinesGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const groupName = "Test1";
  const assessmentName = "assessment_5_9_2019_16_22_14";
  const assessedMachineName = "f57fe432-3bd2-486a-a83a-6f4d99f1a952";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.assessedMachines.get(
    resourceGroupName,
    projectName,
    groupName,
    assessmentName,
    assessedMachineName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assessedMachinesGet();
}

main().catch(console.error);
