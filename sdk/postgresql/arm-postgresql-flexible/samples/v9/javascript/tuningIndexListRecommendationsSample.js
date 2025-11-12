// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieve the list of available tuning index recommendations.
 *
 * @summary Retrieve the list of available tuning index recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningIndex_GetFilteredRecommendations.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function tuningIndexListFilteredRecommendations() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "pgtestrecs";
  const tuningOption = "index";
  const recommendationType = "CreateIndex";
  const options = {
    recommendationType,
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningIndex.listRecommendations(
    resourceGroupName,
    serverName,
    tuningOption,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Retrieve the list of available tuning index recommendations.
 *
 * @summary Retrieve the list of available tuning index recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningIndex_GetRecommendations.json
 */
async function tuningIndexListRecommendations() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "pgtestsvc4";
  const tuningOption = "index";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningIndex.listRecommendations(
    resourceGroupName,
    serverName,
    tuningOption,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await tuningIndexListFilteredRecommendations();
  await tuningIndexListRecommendations();
}

main().catch(console.error);
