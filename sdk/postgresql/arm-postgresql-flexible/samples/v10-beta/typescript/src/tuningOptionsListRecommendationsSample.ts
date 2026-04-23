// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists available object recommendations.
 *
 * @summary lists available object recommendations.
 * x-ms-original-file: 2026-01-01-preview/TuningOptionsListIndexRecommendations.json
 */
async function listAvailableIndexRecommendations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptions.listRecommendations(
    "exampleresourcegroup",
    "exampleserver",
    "index",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists available object recommendations.
 *
 * @summary lists available object recommendations.
 * x-ms-original-file: 2026-01-01-preview/TuningOptionsListIndexRecommendationsFilteredForCreateIndex.json
 */
async function listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptions.listRecommendations(
    "exampleresourcegroup",
    "exampleserver",
    "index",
    { recommendationType: "CreateIndex" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists available object recommendations.
 *
 * @summary lists available object recommendations.
 * x-ms-original-file: 2026-01-01-preview/TuningOptionsListTableRecommendations.json
 */
async function listAvailableTableRecommendations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptions.listRecommendations(
    "exampleresourcegroup",
    "exampleserver",
    "table",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists available object recommendations.
 *
 * @summary lists available object recommendations.
 * x-ms-original-file: 2026-01-01-preview/TuningOptionsListTableRecommendationsFilteredForAnalyzeTable.json
 */
async function listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tuningOptions.listRecommendations(
    "exampleresourcegroup",
    "exampleserver",
    "table",
    { recommendationType: "AnalyzeTable" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAvailableIndexRecommendations();
  await listAvailableIndexRecommendationsFilteredToExclusivelyGetThoseOfCreateIndexType();
  await listAvailableTableRecommendations();
  await listAvailableTableRecommendationsFilteredToExclusivelyGetThoseOfAnalyzeTableType();
}

main().catch(console.error);
