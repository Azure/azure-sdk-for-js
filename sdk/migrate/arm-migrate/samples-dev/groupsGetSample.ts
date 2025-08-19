// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get information related to a specific group in the project. Returns a json object of type 'group' as specified in the models section.
 *
 * @summary Get information related to a specific group in the project. Returns a json object of type 'group' as specified in the models section.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/Groups_Get.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function groupsGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const groupName = "Test1";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.groups.get(resourceGroupName, projectName, groupName);
  console.log(result);
}

async function main(): Promise<void> {
  await groupsGet();
}

main().catch(console.error);
