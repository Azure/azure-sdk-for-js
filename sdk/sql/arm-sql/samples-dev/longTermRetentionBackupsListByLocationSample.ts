// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the long term retention backups for a given location.
 *
 * @summary Lists the long term retention backups for a given location.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/LongTermRetentionBackupListByLocation.json
 */

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAllLongTermRetentionBackupsUnderTheLocation(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "japaneast";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByLocation(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllLongTermRetentionBackupsUnderTheLocation();
}

main().catch(console.error);
