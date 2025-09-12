// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a list of the server's Advanced Threat Protection states.
 *
 * @summary Get a list of the server's Advanced Threat Protection states.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/ServerAdvancedThreatProtectionSettingsListByServer.json
 */
async function listTheServerAdvancedThreatProtectionSettings() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-4799";
  const serverName = "threatprotection-6440";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverAdvancedThreatProtectionSettings.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listTheServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
