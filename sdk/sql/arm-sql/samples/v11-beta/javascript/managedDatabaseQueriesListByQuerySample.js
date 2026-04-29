// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get query execution statistics by query id.
 *
 * @summary get query execution statistics by query id.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceQueryStatisticsList.json
 */
async function obtainQueryExecutionStatistics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseQueries.listByQuery(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "database_1",
    "42",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get query execution statistics by query id.
 *
 * @summary get query execution statistics by query id.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceQueryStatisticsListMax.json
 */
async function obtainQueryExecutionStatisticsExampleWithAllRequestParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseQueries.listByQuery(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "database_1",
    "42",
    { startTime: "03/01/2020 16:23:09", endTime: "03/11/2020 14:00:00", interval: "P1D" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get query execution statistics by query id.
 *
 * @summary get query execution statistics by query id.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceQueryStatisticsListMin.json
 */
async function obtainQueryExecutionStatisticsMinimalExampleWithOnlyMandatoryRequestParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseQueries.listByQuery(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    "database_1",
    "42",
    { interval: "PT1H" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await obtainQueryExecutionStatistics();
  await obtainQueryExecutionStatisticsExampleWithAllRequestParameters();
  await obtainQueryExecutionStatisticsMinimalExampleWithOnlyMandatoryRequestParameters();
}

main().catch(console.error);
