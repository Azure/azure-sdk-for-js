// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an autoscale setting
 *
 * @summary gets an autoscale setting
 * x-ms-original-file: 2022-10-01/getAutoscaleSetting.json
 */
async function getAnAutoscaleSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.autoscaleSettings.get("TestingMetricsScaleSet", "MySetting");
  console.log(result);
}

async function main() {
  await getAnAutoscaleSetting();
}

main().catch(console.error);
