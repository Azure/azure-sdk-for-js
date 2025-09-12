// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the managed instance's Advanced Threat Protection settings.
 *
 * @summary Get the managed instance's Advanced Threat Protection settings.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-02-01-preview/examples/ManagedInstanceAdvancedThreatProtectionSettingsListByInstance.json
 */
async function listTheManagedInstanceAdvancedThreatProtectionSettings() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-4799";
  const managedInstanceName = "threatprotection-6440";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstanceAdvancedThreatProtectionSettings.listByInstance(
    resourceGroupName,
    managedInstanceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listTheManagedInstanceAdvancedThreatProtectionSettings();
}

main().catch(console.error);
