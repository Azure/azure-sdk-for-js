// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Restores a specific backup to another app (or deployment slot, if specified).
 *
 * @summary description for Restores a specific backup to another app (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/RestoreWebAppBackup.json
 */
async function restoreWebAppFromBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.restore("testrg123", "sitef6141", "123244", {
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
    overwrite: true,
    siteName: "sitef6141",
    storageAccountUrl:
      "DefaultEndpointsProtocol=https;AccountName=storagesample;AccountKey=<account-key>",
  });
}

async function main() {
  await restoreWebAppFromBackup();
}

main().catch(console.error);
