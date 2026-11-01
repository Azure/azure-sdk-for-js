// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a metric configuration.
 *
 * @summary creates or updates a metric configuration.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function metricConfigurationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricConfigurations.createOrUpdate(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
    "customdefault",
    "aggregated~2Frequest~20count",
    {
      properties: {
        namespace: "customdefault",
        metricName: "aggregated/request count",
        metricType: "Aggregated",
        aggregationConfigurations: [
          {
            storeAggregatedData: true,
            dimensions: ["microsoft.resourceId"],
            aggregationFunctions: { enableMinMax: true, enablePercentiles: false },
          },
        ],
        sourceMetricResourceId:
          "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/rgazuremonitorworkspace/providers/Microsoft.Monitor/accounts/myAzureMonitorWorkspace/metricsContainers/default/namespaces/customdefault/metrics/requestCount",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await metricConfigurationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
