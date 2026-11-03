// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists maintenance events for a HorizonDB pool. Use the OData $filter query parameter to filter by properties/status with the eq and or operators. For example, properties/status eq 'Planned' or properties/status eq 'InProgress' returns upcoming events.
 *
 * @summary lists maintenance events for a HorizonDB pool. Use the OData $filter query parameter to filter by properties/status with the eq and or operators. For example, properties/status eq 'Planned' or properties/status eq 'InProgress' returns upcoming events.
 * x-ms-original-file: 2026-10-01-preview/MaintenanceEvents_List.json
 */
async function listMaintenanceEventsForAHorizonDBPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceEvents.list(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists maintenance events for a HorizonDB pool. Use the OData $filter query parameter to filter by properties/status with the eq and or operators. For example, properties/status eq 'Planned' or properties/status eq 'InProgress' returns upcoming events.
 *
 * @summary lists maintenance events for a HorizonDB pool. Use the OData $filter query parameter to filter by properties/status with the eq and or operators. For example, properties/status eq 'Planned' or properties/status eq 'InProgress' returns upcoming events.
 * x-ms-original-file: 2026-10-01-preview/MaintenanceEvents_ListWithFilter.json
 */
async function listUpcomingMaintenanceEventsForAHorizonDBPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceEvents.list(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    { filter: "properties/status eq 'Planned' or properties/status eq 'InProgress'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMaintenanceEventsForAHorizonDBPool();
  await listUpcomingMaintenanceEventsForAHorizonDBPool();
}

main().catch(console.error);
