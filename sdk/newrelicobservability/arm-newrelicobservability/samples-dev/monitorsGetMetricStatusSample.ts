// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the metric status that are configured in the New Relic monitor resource
 *
 * @summary retrieves the metric status that are configured in the New Relic monitor resource
 * x-ms-original-file: 2025-05-01-preview/Monitors_GetMetricStatus_MaximumSet_Gen.json
 */
async function monitorsGetMetricStatusMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricStatus("rgNewRelic", "fhcjxnxumkdlgpwanewtkdnyuz", {
    azureResourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
    ],
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieves the metric status that are configured in the New Relic monitor resource
 *
 * @summary retrieves the metric status that are configured in the New Relic monitor resource
 * x-ms-original-file: 2025-05-01-preview/Monitors_GetMetricStatus_MinimumSet_Gen.json
 */
async function monitorsGetMetricStatusMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricStatus("rgNewRelic", "fhcjxnxumkdlgpwanewtkdnyuz", {
    azureResourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
    ],
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMetricStatusMaximumSetGen();
  await monitorsGetMetricStatusMinimumSetGen();
}

main().catch(console.error);
