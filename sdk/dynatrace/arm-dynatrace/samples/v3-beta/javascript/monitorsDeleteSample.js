// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a MonitorResource
 *
 * @summary delete a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_Delete_MaximumSet_Gen.json
 */
async function monitorsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

/**
 * This sample demonstrates how to delete a MonitorResource
 *
 * @summary delete a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_Delete_MinimumSet_Gen.json
 */
async function monitorsDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

async function main() {
  await monitorsDeleteMaximumSetGen();
  await monitorsDeleteMinimumSetGen();
}

main().catch(console.error);
