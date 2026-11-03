// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to calculate price for placing a `ReservationOrder`.
 *
 * @summary calculate price for placing a `ReservationOrder`.
 * x-ms-original-file: 2022-11-01/CalculateReservationOrder.json
 */
async function calculatePrice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.calculate({
    location: "westus",
    appliedScopeType: "Shared",
    billingPlan: "Monthly",
    billingScopeId: "/subscriptions/ed3a1871-612d-abcd-a849-c2542a68be83",
    displayName: "TestReservationOrder",
    quantity: 1,
    reservedResourceProperties: { instanceFlexibility: "On" },
    reservedResourceType: "VirtualMachines",
    term: "P1Y",
    sku: { name: "standard_D1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await calculatePrice();
}

main().catch(console.error);
