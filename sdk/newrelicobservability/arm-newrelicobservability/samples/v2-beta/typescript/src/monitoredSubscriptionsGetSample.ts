// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a MonitoredSubscriptionProperties
 *
 * @summary Get a MonitoredSubscriptionProperties
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/MonitoredSubscriptions_Get.json
 */
async function monitorsGetMonitoredSubscriptions(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const configurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.get(
    resourceGroupName,
    monitorName,
    configurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMonitoredSubscriptions();
}

main().catch(console.error);
