// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of managed database's Advanced Threat Protection states.
 *
 * @summary Gets a list of managed database's Advanced Threat Protection states.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-02-01-preview/examples/ManagedDatabaseAdvancedThreatProtectionSettingsListByDatabase.json
 */
async function getAListOfTheManagedDatabaseAdvancedThreatProtectionSettings() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-6852";
  const managedInstanceName = "threatprotection-2080";
  const databaseName = "testdb";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseAdvancedThreatProtectionSettings.listByDatabase(
    resourceGroupName,
    managedInstanceName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAListOfTheManagedDatabaseAdvancedThreatProtectionSettings();
}

main().catch(console.error);
