// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update subscriptions to be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @summary update subscriptions to be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 * x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Update.json
 */
async function monitorsUpdateMonitoredSubscriptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.update(
    "myResourceGroup",
    "myMonitor",
    "default",
  );
  console.log(result);
}

async function main() {
  await monitorsUpdateMonitoredSubscriptions();
}

main().catch(console.error);
