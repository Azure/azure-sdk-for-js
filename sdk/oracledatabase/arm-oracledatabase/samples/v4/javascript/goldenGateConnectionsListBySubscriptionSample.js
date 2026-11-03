// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list GoldenGateConnection resources by subscription ID
 *
 * @summary list GoldenGateConnection resources by subscription ID
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_ListBySubscription_MaximumSet_Gen.json
 */
async function goldenGateConnectionsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.goldenGateConnections.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await goldenGateConnectionsListBySubscriptionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
