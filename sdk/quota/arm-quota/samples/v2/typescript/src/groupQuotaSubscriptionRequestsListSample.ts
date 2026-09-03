// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list API to check the status of a subscriptionId requests by requestId. Request history is maintained for 1 year.
 *
 * @summary list API to check the status of a subscriptionId requests by requestId. Request history is maintained for 1 year.
 * x-ms-original-file: 2025-09-01/SubscriptionRequests/SubscriptionRequests_List.json
 */
async function groupQuotaSubscriptionRequestsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupQuotaSubscriptionRequests.list(
    "E7EC67B3-7657-4966-BFFC-41EFD36BAA09",
    "groupquota1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await groupQuotaSubscriptionRequestsList();
}

main().catch(console.error);
