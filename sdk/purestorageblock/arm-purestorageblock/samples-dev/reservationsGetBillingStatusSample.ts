// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to provides various statistics about resources billed via given reservation.
 *
 * @summary provides various statistics about resources billed via given reservation.
 * x-ms-original-file: 2024-11-01/Reservations_GetBillingStatus_MaximumSet_Gen.json
 */

import { BlockClient } from "@azure/arm-purestorageblock";
import { DefaultAzureCredential } from "@azure/identity";

async function reservationsGetBillingStatusMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BC47D6CC-AA80-4374-86F8-19D94EC70666";
  const client = new BlockClient(credential, subscriptionId);
  const result = await client.reservations.getBillingStatus("rgpurestorage", "reservationname");
  console.log(result);
}

async function main(): Promise<void> {
  await reservationsGetBillingStatusMaximumSet();
}

main().catch(console.error);
