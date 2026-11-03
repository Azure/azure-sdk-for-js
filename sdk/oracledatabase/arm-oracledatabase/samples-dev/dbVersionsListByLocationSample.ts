// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list DbVersion resources by SubscriptionLocationResource
 *
 * @summary list DbVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-06-01/DbVersions_ListByLocation_MaximumSet_Gen.json
 */
async function dbVersionsListByLocationMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dbVersions.listByLocation("eastus", {
    dbSystemShape: "VM.Standard.x86",
    dbSystemId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/dbSystems/db1",
    storageManagement: "LVM",
    isUpgradeSupported: true,
    isDatabaseSoftwareImageSupported: true,
    shapeFamily: "EXADATA",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await dbVersionsListByLocationMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
