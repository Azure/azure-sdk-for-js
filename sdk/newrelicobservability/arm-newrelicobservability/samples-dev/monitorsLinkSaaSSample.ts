// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to links a new SaaS to the newrelic organization of the underlying monitor.
 *
 * @summary links a new SaaS to the newrelic organization of the underlying monitor.
 * x-ms-original-file: 2025-05-01-preview/Monitors_LinkSaaS.json
 */
async function monitorsLinkSaaS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.linkSaaS("myResourceGroup", "myMonitor", {
    saaSResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgNewRelic/providers/Microsoft.SaaS/resources/abcd",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsLinkSaaS();
}

main().catch(console.error);
