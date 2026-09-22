// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists impacted resources in the subscription by an event.
 *
 * @summary lists impacted resources in the subscription by an event.
 * x-ms-original-file: 2025-05-01/ImpactedResources_ListBySubscriptionId_ListByEventId.json
 */
async function listImpactedResourcesBySubscriptionId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.impactedResources.listBySubscriptionIdAndEventId("BC_1-FXZ", {
    filter: "targetRegion eq 'westus'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listImpactedResourcesBySubscriptionId();
}

main().catch(console.error);
