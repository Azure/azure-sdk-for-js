// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NewRelicObservability } = require("@azure/arm-newrelicobservability");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a MonitoredSubscriptionProperties
 *
 * @summary create a MonitoredSubscriptionProperties
 * x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_CreateOrUpdate.json
 */
async function monitorsAddMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.createOrUpdate(
    "myResourceGroup",
    "myMonitor",
    "default",
  );
  console.log(result);
}

async function main() {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
