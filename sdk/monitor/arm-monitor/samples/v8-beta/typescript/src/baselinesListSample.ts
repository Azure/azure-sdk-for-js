// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to **Lists the metric baseline values for a resource**.
 *
 * @summary **Lists the metric baseline values for a resource**.
 * x-ms-original-file: 2019-03-01/metricBaselines.json
 */
async function getMetricBaselines(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.baselines.list(
    "subscriptions/b368ca2f-e298-46b7-b0ab-012281956afa/resourceGroups/vms/providers/Microsoft.Compute/virtualMachines/vm1",
    {
      timespan: "2019-03-12T11:00:00.000Z/2019-03-12T12:00:00.000Z",
      interval: "PT1H",
      aggregation: "average",
      sensitivities: "Low,Medium",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetricBaselines();
}

main().catch(console.error);
