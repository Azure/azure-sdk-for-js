// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update automatic tuning properties for target database.
 *
 * @summary Update automatic tuning properties for target database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseAutomaticTuningUpdateMax.json
 */
async function updatesDatabaseAutomaticTuningSettingsWithAllProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "c3aa9078-0000-0000-0000-e36f151182d7";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "default-sql-onebox";
  const serverName = "testsvr11";
  const databaseName = "db1";
  const parameters = {
    desiredState: "Auto",
    options: {
      createIndex: { desiredState: "Off" },
      dropIndex: { desiredState: "On" },
      forceLastGoodPlan: { desiredState: "Default" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAutomaticTuningOperations.update(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update automatic tuning properties for target database.
 *
 * @summary Update automatic tuning properties for target database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/DatabaseAutomaticTuningUpdateMin.json
 */
async function updatesDatabaseAutomaticTuningSettingsWithMinimalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "c3aa9078-0000-0000-0000-e36f151182d7";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "default-sql-onebox";
  const serverName = "testsvr11";
  const databaseName = "db1";
  const parameters = { desiredState: "Auto" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAutomaticTuningOperations.update(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updatesDatabaseAutomaticTuningSettingsWithAllProperties();
  await updatesDatabaseAutomaticTuningSettingsWithMinimalProperties();
}

main().catch(console.error);
