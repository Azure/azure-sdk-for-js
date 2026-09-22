// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the autoscale settings for a resource group
 *
 * @summary lists the autoscale settings for a resource group
 * x-ms-original-file: 2022-10-01/listAutoscaleSetting.json
 */
async function listAutoscaleSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoscaleSettings.listByResourceGroup("TestingMetricsScaleSet")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutoscaleSettings();
}

main().catch(console.error);
