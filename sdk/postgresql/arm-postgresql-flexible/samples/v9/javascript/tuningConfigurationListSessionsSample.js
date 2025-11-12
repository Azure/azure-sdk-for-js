// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets up the config tuning session status.
 *
 * @summary Gets up the config tuning session status.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningConfiguration_ListSessions.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function tuningConfigurationListSessions() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const tuningOption = "configuration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningConfiguration.listSessions(
    resourceGroupName,
    serverName,
    tuningOption,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await tuningConfigurationListSessions();
}

main().catch(console.error);
