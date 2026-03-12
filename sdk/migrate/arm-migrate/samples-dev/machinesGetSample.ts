// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the machine with the specified name. Returns a json object of type 'machine' defined in Models section.
 *
 * @summary Get the machine with the specified name. Returns a json object of type 'machine' defined in Models section.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/Machines_Get.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function machinesGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const machineName = "269ef295-a38d-4f8f-9779-77ce79088311";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.machines.get(resourceGroupName, projectName, machineName);
  console.log(result);
}

async function main(): Promise<void> {
  await machinesGet();
}

main().catch(console.error);
