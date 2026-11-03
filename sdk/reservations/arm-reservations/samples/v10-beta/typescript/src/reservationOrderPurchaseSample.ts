// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to purchase `ReservationOrder` and create resource under the specified URI.
 *
 * @summary purchase `ReservationOrder` and create resource under the specified URI.
 * x-ms-original-file: 2022-11-01/PurchaseReservationOrder.json
 */
async function purchase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.reservationOrder.purchase("a075419f-44cc-497f-b68a-14ee811d48b9", {
    location: "westus",
    appliedScopeType: "Shared",
    billingPlan: "Monthly",
    billingScopeId: "/subscriptions/ed3a1871-612d-abcd-a849-c2542a68be83",
    displayName: "TestReservationOrder",
    quantity: 1,
    renew: false,
    reservedResourceProperties: { instanceFlexibility: "On" },
    reservedResourceType: "VirtualMachines",
    term: "P1Y",
    sku: { name: "standard_D1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await purchase();
}

main().catch(console.error);
