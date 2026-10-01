// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ResourceAnchor resources by subscription ID
 *
 * @summary list ResourceAnchor resources by subscription ID
 * x-ms-original-file: 2026-06-01/ResourceAnchors_ListBySubscription_MaximumSet_Gen.json
 */
async function resourceAnchorsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceAnchors.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await resourceAnchorsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
