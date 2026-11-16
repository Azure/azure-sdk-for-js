// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger a forced failover with potential data loss for the parent scheduler
 *
 * @summary trigger a forced failover with potential data loss for the parent scheduler
 * x-ms-original-file: 2026-07-01-preview/FailoverInstances_ForceFailoverAllowDataLoss.json
 */
async function failoverInstancesForceFailoverAllowDataLoss() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "194D3C1E-462F-4738-9025-092A628C06EB";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.failoverInstances.forceFailoverAllowDataLoss(
    "rgdurabletask",
    "testscheduler",
  );
  console.log(result);
}

async function main() {
  await failoverInstancesForceFailoverAllowDataLoss();
}

main().catch(console.error);
