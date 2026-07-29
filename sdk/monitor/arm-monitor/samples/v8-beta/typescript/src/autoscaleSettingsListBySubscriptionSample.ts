// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the autoscale settings for a subscription
 *
 * @summary lists the autoscale settings for a subscription
 * x-ms-original-file: 2022-10-01/listAutoscaleSettingBySubscription.json
 */
async function listAutoscaleSettingsBySubs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoscaleSettings.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutoscaleSettingsBySubs();
}

main().catch(console.error);
