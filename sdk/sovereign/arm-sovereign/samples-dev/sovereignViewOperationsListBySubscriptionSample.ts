// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-sovereign";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Sovereign View resources within a subscription.
 *
 * @summary lists the Sovereign View resources within a subscription.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ListBySubscription.json
 */
async function sovereignViewOperationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sovereignViewOperations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await sovereignViewOperationsListBySubscription();
}

main().catch(console.error);
