// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-05-01-preview/Reservations_LinkSaaS_MaximumSet_Gen.json
 */
async function reservationsLinkSaaS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.linkSaaS("rgpurestorage", "reservation-01", {
    saaSResourceId:
      "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgpurestorage/providers/Microsoft.SaaS/resources/saas-resource-01",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsLinkSaaS();
}

main().catch(console.error);
