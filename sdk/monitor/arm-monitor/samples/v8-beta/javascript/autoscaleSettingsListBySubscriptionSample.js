// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the autoscale settings for a subscription
 *
 * @summary lists the autoscale settings for a subscription
 * x-ms-original-file: 2022-10-01/listAutoscaleSettingBySubscription.json
 */
async function listAutoscaleSettingsBySubs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoscaleSettings.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutoscaleSettingsBySubs();
}

main().catch(console.error);
