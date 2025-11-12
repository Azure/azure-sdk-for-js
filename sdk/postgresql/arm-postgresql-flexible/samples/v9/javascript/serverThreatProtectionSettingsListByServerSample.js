// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a list of server's Threat Protection state.
 *
 * @summary Get a list of server's Threat Protection state.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/ServerThreatProtectionSettingsListByServer.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function getAServerAdvancedThreatProtectionSettings() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "threatprotection-6852";
  const serverName = "threatprotection-2080";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serverThreatProtectionSettings.listByServer(
    resourceGroupName,
    serverName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
