// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a managed database's Advanced Threat Protection state.
 *
 * @summary Creates or updates a managed database's Advanced Threat Protection state.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-02-01-preview/examples/ManagedDatabaseAdvancedThreatProtectionSettingsCreateMax.json
 */
async function updateAManagedDatabaseAdvancedThreatProtectionSettingsWithAllParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-4799";
  const managedInstanceName = "threatprotection-6440";
  const databaseName = "testdb";
  const advancedThreatProtectionName = "Default";
  const parameters = {
    state: "Enabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseAdvancedThreatProtectionSettings.createOrUpdate(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    advancedThreatProtectionName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates a managed database's Advanced Threat Protection state.
 *
 * @summary Creates or updates a managed database's Advanced Threat Protection state.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-02-01-preview/examples/ManagedDatabaseAdvancedThreatProtectionSettingsCreateMin.json
 */
async function updateAManagedDatabaseAdvancedThreatProtectionSettingsWithMinimalParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "threatprotection-4799";
  const managedInstanceName = "threatprotection-6440";
  const databaseName = "testdb";
  const advancedThreatProtectionName = "Default";
  const parameters = {
    state: "Disabled",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseAdvancedThreatProtectionSettings.createOrUpdate(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    advancedThreatProtectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateAManagedDatabaseAdvancedThreatProtectionSettingsWithAllParameters();
  await updateAManagedDatabaseAdvancedThreatProtectionSettingsWithMinimalParameters();
}

main().catch(console.error);
