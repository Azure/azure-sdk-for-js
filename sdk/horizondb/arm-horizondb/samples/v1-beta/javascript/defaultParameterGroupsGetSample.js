// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a default parameter group available for a subscription in a specific region. Each PostgreSQL version has at most one default parameter group in a location.
 *
 * @summary gets a default parameter group available for a subscription in a specific region. Each PostgreSQL version has at most one default parameter group in a location.
 * x-ms-original-file: 2026-10-01-preview/DefaultParameterGroups_Get.json
 */
async function getADefaultHorizonDBParameterGroupBySubscriptionLocationAndName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.defaultParameterGroups.get(
    "eastus2",
    "default-postgresql-17-provisioned",
  );
  console.log(result);
}

async function main() {
  await getADefaultHorizonDBParameterGroupBySubscriptionLocationAndName();
}

main().catch(console.error);
