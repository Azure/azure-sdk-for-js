// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SaaSData} from "@azure/arm-newrelicobservability";
import {
  NewRelicObservability,
} from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Links a new SaaS to the newrelic organization of the underlying monitor.
 *
 * @summary Links a new SaaS to the newrelic organization of the underlying monitor.
 * x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2025-05-01-preview/examples/Monitors_LinkSaaS.json
 */
async function monitorsLinkSaaS(): Promise<void> {
  const subscriptionId =
    process.env["NEWRELICOBSERVABILITY_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NEWRELICOBSERVABILITY_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const body: SaaSData = {
    saaSResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/Microsoft.SaaS/resources/abcd",
  };
  const credential = new DefaultAzureCredential();
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.beginLinkSaaSAndWait(
    resourceGroupName,
    monitorName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsLinkSaaS();
}

main().catch(console.error);
