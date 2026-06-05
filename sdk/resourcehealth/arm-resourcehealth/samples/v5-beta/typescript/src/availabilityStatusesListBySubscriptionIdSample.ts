// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftResourceHealth } from "@azure/arm-resourcehealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the current availability status for all the resources in the subscription.
 *
 * @summary lists the current availability status for all the resources in the subscription.
 * x-ms-original-file: 2025-05-01/AvailabilityStatuses_ListBySubscriptionId.json
 */
async function listHealthBySubscriptionId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new MicrosoftResourceHealth(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilityStatuses.listBySubscriptionId({
    expand: "recommendedactions",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listHealthBySubscriptionId();
}

main().catch(console.error);
