// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a VMware collector from the project.
 *
 * @summary Delete a VMware collector from the project.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/VMwareCollectors_Delete.json
 */

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vMwareCollectorsDelete(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const vmWareCollectorName = "PortalvCenterbc2fcollector";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.vMwareCollectors.delete(
    resourceGroupName,
    projectName,
    vmWareCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await vMwareCollectorsDelete();
}

main().catch(console.error);
