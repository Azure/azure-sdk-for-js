// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Exports the backup of the given server by creating a backup if not existing.
 *
 * @summary Exports the backup of the given server by creating a backup if not existing.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/Backups/preview/2023-10-01-preview/examples/BackupAndExport.json
 */

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function createAndExportBackup() {
  const subscriptionId =
    process.env["MYSQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["MYSQL_RESOURCE_GROUP"] || "TestGroup";
  const serverName = "mysqltestserver";
  const parameters = {
    backupSettings: { backupName: "customer-backup-name" },
    targetDetails: {
      objectType: "FullBackupStoreDetails",
      sasUriList: ["sasuri1", "sasuri2"],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupAndExport.beginCreateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createAndExportBackup();
}

main().catch(console.error);
