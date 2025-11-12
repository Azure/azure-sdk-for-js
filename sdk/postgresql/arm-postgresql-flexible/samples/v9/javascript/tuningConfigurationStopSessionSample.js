// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Stops the config tuning session.
 *
 * @summary Stops the config tuning session.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningConfiguration_StopSession.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function tuningConfigurationStopSession() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const tuningOption = "configuration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.tuningConfiguration.beginStopSessionAndWait(
    resourceGroupName,
    serverName,
    tuningOption,
  );
  console.log(result);
}

async function main() {
  await tuningConfigurationStopSession();
}

main().catch(console.error);
