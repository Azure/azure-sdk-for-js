// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Starts up the config tuning session.
 *
 * @summary Starts up the config tuning session.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningConfiguration_StartSession.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function tuningConfigurationStartSession() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const tuningOption = "configuration";
  const configTuningRequest = {
    allowServerRestarts: false,
    targetImprovementMetric: "targetImprovementMetric",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.tuningConfiguration.beginStartSessionAndWait(
    resourceGroupName,
    serverName,
    tuningOption,
    configTuningRequest,
  );
  console.log(result);
}

async function main() {
  await tuningConfigurationStartSession();
}

main().catch(console.error);
