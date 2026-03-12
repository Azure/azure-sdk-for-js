// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists available object recommendations.
 *
 * @summary Lists available object recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/TuningOptionsListIndexRecommendationsFilteredForCreateIndex.json
 */
async function listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "index";
  const recommendationType = "CreateIndex";
  const options = {
    recommendationType,
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptionsOperations.listRecommendations(
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
 * This sample demonstrates how to Lists available object recommendations.
 *
 * @summary Lists available object recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/TuningOptionsListIndexRecommendations.json
 */
async function listAvailableIndexRecommendations() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "index";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptionsOperations.listRecommendations(
    resourceGroupName,
    serverName,
    tuningOption,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists available object recommendations.
 *
 * @summary Lists available object recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/TuningOptionsListTableRecommendationsFilteredForAnalyzeTable.json
 */
async function listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "table";
  const recommendationType = "AnalyzeTable";
  const options = {
    recommendationType,
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptionsOperations.listRecommendations(
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
 * This sample demonstrates how to Lists available object recommendations.
 *
 * @summary Lists available object recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/TuningOptionsListTableRecommendations.json
 */
async function listAvailableTableRecommendations() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "table";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptionsOperations.listRecommendations(
    resourceGroupName,
    serverName,
    tuningOption,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType();
  await listAvailableIndexRecommendations();
  await listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType();
  await listAvailableTableRecommendations();
}

main().catch(console.error);
