// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes and autoscale setting
 *
 * @summary deletes and autoscale setting
 * x-ms-original-file: 2022-10-01/deleteAutoscaleSetting.json
 */
async function deleteAnAutoscaleSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  await client.autoscaleSettings.delete("TestingMetricsScaleSet", "MySetting");
}

async function main() {
  await deleteAnAutoscaleSetting();
}

main().catch(console.error);
