// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates a backup of an app.
 *
 * @summary description for Creates a backup of an app.
 * x-ms-original-file: 2025-05-01/BackupWebApp.json
 */
async function backupWebApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.backup("testrg123", "sitef6141", {
    backupName: "abcdwe",
    backupSchedule: {
      frequencyInterval: 7,
      frequencyUnit: "Day",
      keepAtLeastOneBackup: true,
      retentionPeriodInDays: 30,
      startTime: new Date("2022-09-02T17:33:11.641Z"),
    },
    databases: [
      {
        name: "backenddb",
        connectionString:
          "DSN=data-source-name[;SERVER=value] [;PWD=value] [;UID=value] [;<Attribute>=<value>]",
        connectionStringName: "backend",
        databaseType: "SqlAzure",
      },
      {
        name: "statsdb",
        connectionString:
          "DSN=data-source-name[;SERVER=value] [;PWD=value] [;UID=value] [;<Attribute>=<value>]",
        connectionStringName: "stats",
        databaseType: "SqlAzure",
      },
    ],
    enabled: true,
    storageAccountUrl:
      "DefaultEndpointsProtocol=https;AccountName=storagesample;AccountKey=<account-key>",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await backupWebApp();
}

main().catch(console.error);
