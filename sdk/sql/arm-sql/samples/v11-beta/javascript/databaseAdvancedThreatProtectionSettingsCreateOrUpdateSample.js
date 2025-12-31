// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a database's Advanced Threat Protection state.
 *
 * @summary Creates or updates a database's Advanced Threat Protection state.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/DatabaseAdvancedThreatProtectionSettingsCreateMax.json
 */
async function updateADatabaseAdvancedThreatProtectionSettingsWithAllParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-4799";
  const serverName = "threatprotection-6440";
  const databaseName = "testdb";
  const advancedThreatProtectionName = "Default";
  const parameters = { state: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvancedThreatProtectionSettings.createOrUpdate(
    resourceGroupName,
    serverName,
    databaseName,
    advancedThreatProtectionName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a database's Advanced Threat Protection state.
 *
 * @summary Creates or updates a database's Advanced Threat Protection state.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-11-01-preview/examples/DatabaseAdvancedThreatProtectionSettingsCreateMin.json
 */
async function updateADatabaseAdvancedThreatProtectionSettingsWithMinimalParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-4799";
  const serverName = "threatprotection-6440";
  const databaseName = "testdb";
  const advancedThreatProtectionName = "Default";
  const parameters = { state: "Disabled" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvancedThreatProtectionSettings.createOrUpdate(
    resourceGroupName,
    serverName,
    databaseName,
    advancedThreatProtectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateADatabaseAdvancedThreatProtectionSettingsWithAllParameters();
  await updateADatabaseAdvancedThreatProtectionSettingsWithMinimalParameters();
}

main().catch(console.error);
