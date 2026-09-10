// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the latest SaaS linked to the reservation.
 *
 * @summary returns the latest SaaS linked to the reservation.
 * x-ms-original-file: 2026-05-01-preview/Reservations_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function reservationsLatestLinkedSaaS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.latestLinkedSaaS("rgpurestorage", "reservation-01");
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsLatestLinkedSaaS();
}

main().catch(console.error);
