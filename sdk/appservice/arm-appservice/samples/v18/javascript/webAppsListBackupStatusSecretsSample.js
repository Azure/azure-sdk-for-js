// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body.
 *
 * @summary description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body.
 * x-ms-original-file: 2025-05-01/GetWebAppBackupWithSecrets.json
 */
async function getWebAppBackupWithSecrets() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.listBackupStatusSecrets("testrg123", "sitef6141", "12345", {
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

async function main() {
  await getWebAppBackupWithSecrets();
}

main().catch(console.error);
