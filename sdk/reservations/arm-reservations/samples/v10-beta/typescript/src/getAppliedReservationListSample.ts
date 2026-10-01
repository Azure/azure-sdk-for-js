// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get applicable `Reservation`s that are applied to this subscription or a resource group under this subscription.
 *
 * @summary get applicable `Reservation`s that are applied to this subscription or a resource group under this subscription.
 * x-ms-original-file: 2022-11-01/GetAppliedReservations.json
 */
async function appliedReservationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.getAppliedReservationList("23bc208b-083f-4901-ae85-4f98c0c3b4b6");
  console.log(result);
}

async function main(): Promise<void> {
  await appliedReservationList();
}

main().catch(console.error);
