// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Accept subscription ownership status.
 *
 * @summary Accept subscription ownership status.
 * x-ms-original-file: specification/subscription/resource-manager/Microsoft.Subscription/stable/2021-10-01/examples/acceptOwnershipStatus.json
 */

import { SubscriptionClient } from "@azure/arm-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

async function acceptOwnershipStatus(): Promise<void> {
  const subscriptionId = "291bba3f-e0a5-47bc-a099-3bdcb2a50a05";
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const result = await client.subscriptionOperations.acceptOwnershipStatus(subscriptionId);
  console.log(result);
}

acceptOwnershipStatus().catch(console.error);
