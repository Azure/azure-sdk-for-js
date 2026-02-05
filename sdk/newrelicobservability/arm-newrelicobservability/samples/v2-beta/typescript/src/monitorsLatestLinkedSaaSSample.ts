// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 *
 * @summary Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function monitorsLatestLinkedSaaSMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.latestLinkedSaaS(
    resourceGroupName,
    monitorName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 *
 * @summary Returns the latest SaaS linked to the newrelic organization of the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_LatestLinkedSaaS_MinimumSet_Gen.json
 */
async function monitorsLatestLinkedSaaSMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "rgopenapi";
  const monitorName = "ipxmlcbonyxtolzejcjshkmlron";
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.latestLinkedSaaS(
    resourceGroupName,
    monitorName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsLatestLinkedSaaSMaximumSetGen();
  await monitorsLatestLinkedSaaSMinimumSetGen();
}

main().catch(console.error);
