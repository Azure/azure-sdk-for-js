// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-arcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to request forced failover of the availability group to this server.
 *
 * @summary request forced failover of the availability group to this server.
 * x-ms-original-file: 2026-03-01-preview/ForceFailoverArcSqlServerAvailabilityGroup.json
 */
async function availabilityGroupForceFailoverToThisServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerAvailabilityGroups.forceFailoverAllowDataLoss(
    "testrg",
    "testSqlServer_INST1",
    "testAG",
  );
  console.log(result);
}

async function main() {
  await availabilityGroupForceFailoverToThisServer();
}

main().catch(console.error);
