// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all snapshots of a resource for a given time interval.
 *
 * @summary list all snapshots of a resource for a given time interval.
 * x-ms-original-file: 2021-06-01-preview/ResourcesHistoryGet.json
 */
async function resourceHistoryQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resourcesHistory({
    options: {
      interval: {
        end: new Date("2020-11-12T01:25:00.0000000Z"),
        start: new Date("2020-11-12T01:00:00.0000000Z"),
      },
    },
    query: "where name =~ 'cpu-utilization' | project id, name, properties",
    subscriptions: ["a7f33fdb-e646-4f15-89aa-3a360210861e"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list all snapshots of a resource for a given time interval.
 *
 * @summary list all snapshots of a resource for a given time interval.
 * x-ms-original-file: 2021-06-01-preview/ResourcesHistoryMgsGet.json
 */
async function resourceHistoryManagementGroupScopeQuery() {
  const credential = new DefaultAzureCredential();
  const client = new ResourceGraphClient(credential);
  const result = await client.resourcesHistory({
    managementGroups: ["e927f598-c1d4-4f72-8541-95d83a6a4ac8", "ProductionMG"],
    options: {
      interval: {
        end: new Date("2020-11-12T01:25:00.0000000Z"),
        start: new Date("2020-11-12T01:00:00.0000000Z"),
      },
    },
    query: "where name =~ 'cpu-utilization' | project id, name, properties",
  });
  console.log(result);
}

async function main() {
  await resourceHistoryQuery();
  await resourceHistoryManagementGroupScopeQuery();
}

main().catch(console.error);
