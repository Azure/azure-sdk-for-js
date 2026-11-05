// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DatabaseEdition resources by SubscriptionLocationResource
 *
 * @summary list DatabaseEdition resources by SubscriptionLocationResource
 * x-ms-original-file: 2026-06-01/DatabaseEditions_ListByLocation_MaximumSet_Gen.json
 */
async function databaseEditionsListByLocationMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseEditions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await databaseEditionsListByLocationMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
