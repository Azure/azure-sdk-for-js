// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get top resource consuming queries of a managed instance.
 *
 * @summary get top resource consuming queries of a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTopQueriesList.json
 */
async function obtainListOfInstanceTopResourceConsumingQueries() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByManagedInstance(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    { interval: "PT1H", observationMetric: "duration" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get top resource consuming queries of a managed instance.
 *
 * @summary get top resource consuming queries of a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTopQueriesListMax.json
 */
async function obtainListOfInstanceTopResourceConsumingQueriesFullBlownRequestAndResponse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByManagedInstance(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
    {
      databases: "db1,db2",
      startTime: "2020-03-10T12:00:00Z",
      endTime: "2020-03-12T12:00:00Z",
      interval: "P1D",
      observationMetric: "cpu",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get top resource consuming queries of a managed instance.
 *
 * @summary get top resource consuming queries of a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceTopQueriesListMin.json
 */
async function obtainListOfInstanceTopResourceConsumingQueriesMinimalRequestAndResponse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByManagedInstance(
    "sqlcrudtest-7398",
    "sqlcrudtest-4645",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await obtainListOfInstanceTopResourceConsumingQueries();
  await obtainListOfInstanceTopResourceConsumingQueriesFullBlownRequestAndResponse();
  await obtainListOfInstanceTopResourceConsumingQueriesMinimalRequestAndResponse();
}

main().catch(console.error);
