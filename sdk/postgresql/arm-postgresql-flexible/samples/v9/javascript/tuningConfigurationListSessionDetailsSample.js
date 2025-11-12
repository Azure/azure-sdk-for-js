// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the session details of a config tuning session.
 *
 * @summary Gets the session details of a config tuning session.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningConfiguration_ListSessionDetails.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function tuningConfigurationListSessionDetails() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const tuningOption = "configuration";
  const sessionId = "oooooooo-oooo-oooo-oooo-oooooooooooo";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningConfiguration.listSessionDetails(
    resourceGroupName,
    serverName,
    tuningOption,
    sessionId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await tuningConfigurationListSessionDetails();
}

main().catch(console.error);
