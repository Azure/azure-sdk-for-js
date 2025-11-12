// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Enables the config tuning.
 *
 * @summary Enables the config tuning.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningConfiguration_Enable.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function tuningConfigurationEnable() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const tuningOption = "configuration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.tuningConfiguration.beginEnableAndWait(
    resourceGroupName,
    serverName,
    tuningOption,
  );
  console.log(result);
}

async function main() {
  await tuningConfigurationEnable();
}

main().catch(console.error);
