// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MetricsStatusRequest} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the metric status that are configured in the New Relic monitor resource
 *
 * @summary Retrieves the metric status that are configured in the New Relic monitor resource
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_GetMetricStatus_MaximumSet_Gen.json
 */
async function monitorsGetMetricStatusMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "fhcjxnxumkdlgpwanewtkdnyuz";
  const request: MetricsStatusRequest = {
    azureResourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
    ],
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricStatus(
    resourceGroupName,
    monitorName,
    request,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves the metric status that are configured in the New Relic monitor resource
 *
 * @summary Retrieves the metric status that are configured in the New Relic monitor resource
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_GetMetricStatus_MinimumSet_Gen.json
 */
async function monitorsGetMetricStatusMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgNewRelic";
  const monitorName = "fhcjxnxumkdlgpwanewtkdnyuz";
  const request: MetricsStatusRequest = {
    azureResourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/NewRelic.Observability/monitors/fhcjxnxumkdlgpwanewtkdnyuz",
    ],
    userEmail: "ruxvg@xqkmdhrnoo.hlmbpm",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.getMetricStatus(
    resourceGroupName,
    monitorName,
    request,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMetricStatusMaximumSetGen();
  await monitorsGetMetricStatusMinimumSetGen();
}

main().catch(console.error);
