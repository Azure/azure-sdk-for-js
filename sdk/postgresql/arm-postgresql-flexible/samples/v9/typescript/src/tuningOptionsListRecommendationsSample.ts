// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TuningOptionsListRecommendationsOptionalParams} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists available object recommendations.
 *
 * @summary Lists available object recommendations.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/TuningOptionsListIndexRecommendationsFilteredForCreateIndex.json
 */
async function listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "index";
  const recommendationType = "CreateIndex";
  const options: TuningOptionsListRecommendationsOptionalParams = {
    recommendationType,
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
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
async function listAvailableIndexRecommendations(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "index";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
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
async function listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "table";
  const recommendationType = "AnalyzeTable";
  const options: TuningOptionsListRecommendationsOptionalParams = {
    recommendationType,
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
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
async function listAvailableTableRecommendations(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const tuningOption = "table";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
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

async function main(): Promise<void> {
  await listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType();
  await listAvailableIndexRecommendations();
  await listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType();
  await listAvailableTableRecommendations();
}

main().catch(console.error);
