// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id
 *
 * @summary Change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id
 * x-ms-original-file: specification/reservations/resource-manager/Microsoft.Capacity/stable/2022-11-01/examples/ChangeDirectoryReservationOrder.json
 */

import type { ChangeDirectoryRequest } from "@azure/arm-reservations";
import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function changeDirectory(): Promise<void> {
  const reservationOrderId = "a075419f-44cc-497f-b68a-14ee811d48b9";
  const body: ChangeDirectoryRequest = {
    destinationTenantId: "906655ea-30be-4587-9d12-b50e077b0f32",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.changeDirectory(reservationOrderId, body);
  console.log(result);
}

async function main(): Promise<void> {
  await changeDirectory();
}

main().catch(console.error);
