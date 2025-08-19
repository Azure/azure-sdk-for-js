// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMigrateV2 } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a VMware collector.
 *
 * @summary Get a VMware collector.
 * x-ms-original-file: specification/migrate/resource-manager/Microsoft.Migrate/stable/2019-10-01/examples/VMwareCollectors_Get.json
 */
async function vMwareCollectorsGet(): Promise<void> {
  const subscriptionId =
    process.env["MIGRATE_SUBSCRIPTION_ID"] || "6393a73f-8d55-47ef-b6dd-179b3e0c7910";
  const resourceGroupName = process.env["MIGRATE_RESOURCE_GROUP"] || "abgoyal-westEurope";
  const projectName = "abgoyalWEselfhostb72bproject";
  const vmWareCollectorName = "PortalvCenterbc2fcollector";
  const credential = new DefaultAzureCredential();
  const client = new AzureMigrateV2(credential, subscriptionId);
  const result = await client.vMwareCollectors.get(
    resourceGroupName,
    projectName,
    vmWareCollectorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await vMwareCollectorsGet();
}

main().catch(console.error);
