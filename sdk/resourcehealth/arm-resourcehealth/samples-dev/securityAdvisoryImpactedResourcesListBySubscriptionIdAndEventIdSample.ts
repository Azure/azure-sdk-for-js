// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists impacted resources in the subscription by an event (Security Advisory).
 *
 * @summary lists impacted resources in the subscription by an event (Security Advisory).
 * x-ms-original-file: 2025-05-01/SecurityAdvisoryImpactedResources_ListBySubscriptionId_ListByEventId.json
 */
async function listSecurityAdvisoryImpactedResourcesBySubscriptionId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityAdvisoryImpactedResources.listBySubscriptionIdAndEventId(
    "BC_1-FXZ",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityAdvisoryImpactedResourcesBySubscriptionId();
}

main().catch(console.error);
