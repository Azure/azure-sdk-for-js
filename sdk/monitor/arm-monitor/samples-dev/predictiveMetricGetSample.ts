// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get predictive autoscale metric future data
 *
 * @summary get predictive autoscale metric future data
 * x-ms-original-file: 2022-10-01/GetPredictiveMetric.json
 */
async function getMetricForData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.predictiveMetric.get(
    "myRG",
    "vmss1-Autoscale-775",
    "2021-10-14T22:00:00.000Z/2021-10-16T22:00:00.000Z",
    "PT1H",
    "Microsoft.Compute/virtualMachineScaleSets",
    "PercentageCPU",
    "Total",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMetricForData();
}

main().catch(console.error);
