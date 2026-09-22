// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the applied scopes of the `Reservation`.
 *
 * @summary updates the applied scopes of the `Reservation`.
 * x-ms-original-file: 2022-11-01/UpdateReservation.json
 */
async function patchReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservation.update(
    "276e7ae4-84d0-4da6-ab4b-d6b94f3557da",
    "6ef59113-3482-40da-8d79-787f823e34bc",
    { appliedScopeType: "Shared", instanceFlexibility: "Off" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchReservation();
}

main().catch(console.error);
