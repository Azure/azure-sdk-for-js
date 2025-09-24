// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update automatic tuning options on server.
 *
 * @summary Update automatic tuning options on server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerAutomaticTuningUpdateMax.json
 */
async function updatesServerAutomaticTuningSettingsWithAllProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "c3aa9078-0000-0000-0000-e36f151182d7";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "default-sql-onebox";
  const serverName = "testsvr11";
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
  const result = await client.serverAutomaticTuningOperations.update(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Update automatic tuning options on server.
 *
 * @summary Update automatic tuning options on server.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ServerAutomaticTuningUpdateMin.json
 */
async function updatesServerAutomaticTuningSettingsWithMinimalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "c3aa9078-0000-0000-0000-e36f151182d7";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "default-sql-onebox";
  const serverName = "testsvr11";
  const parameters = { desiredState: "Auto" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.serverAutomaticTuningOperations.update(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updatesServerAutomaticTuningSettingsWithAllProperties();
  await updatesServerAutomaticTuningSettingsWithMinimalProperties();
}

main().catch(console.error);
