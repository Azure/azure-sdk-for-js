// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes and autoscale setting
 *
 * @summary deletes and autoscale setting
 * x-ms-original-file: 2022-10-01/deleteAutoscaleSetting.json
 */
async function deleteAnAutoscaleSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b67f7fec-69fc-4974-9099-a26bd6ffeda3";
  const client = new MonitorClient(credential, subscriptionId);
  await client.autoscaleSettings.delete("TestingMetricsScaleSet", "MySetting");
}

async function main(): Promise<void> {
  await deleteAnAutoscaleSetting();
}

main().catch(console.error);
