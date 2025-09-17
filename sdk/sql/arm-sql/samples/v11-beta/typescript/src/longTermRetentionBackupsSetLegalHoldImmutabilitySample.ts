// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Set legal hold immutability of an existing long term retention backup.
 *
 * @summary Set legal hold immutability of an existing long term retention backup.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/SetLegalHoldImmutabilityLongTermRetentionBackup.json
 */
async function setLegalHoldImmutabilityOfTheLongTermRetentionBackup(): Promise<void> {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const locationName = "japaneast";
  const longTermRetentionServerName = "testserver";
  const longTermRetentionDatabaseName = "testDatabase";
  const backupName =
    "55555555-6666-7777-8888-999999999999;131637960820000000;Hot";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result =
    await client.longTermRetentionBackups.beginSetLegalHoldImmutabilityAndWait(
      locationName,
      longTermRetentionServerName,
      longTermRetentionDatabaseName,
      backupName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await setLegalHoldImmutabilityOfTheLongTermRetentionBackup();
}

main().catch(console.error);
