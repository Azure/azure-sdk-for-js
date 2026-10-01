// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureReservationAPI } = require("@azure/arm-reservations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to calculates price for exchanging `Reservations` if there are no policy errors.
 *
 * @summary calculates price for exchanging `Reservations` if there are no policy errors.
 * x-ms-original-file: 2022-11-01/CalculateExchange.json
 */
async function calculateExchange() {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const result = await client.calculateExchange.post({
    properties: {
      reservationsToExchange: [
        {
          quantity: 1,
          reservationId:
            "/providers/microsoft.capacity/reservationOrders/1f14354c-dc12-4c8d-8090-6f295a3a34aa/reservations/c8c926bd-fc5d-4e29-9d43-b68340ac23a6",
        },
      ],
      reservationsToPurchase: [
        {
          location: "westus",
          appliedScopeType: "Shared",
          billingPlan: "Upfront",
          billingScopeId: "/subscriptions/ed3a1871-612d-abcd-a849-c2542a68be83",
          displayName: "testDisplayName",
          quantity: 1,
          renew: false,
          reservedResourceProperties: { instanceFlexibility: "On" },
          reservedResourceType: "VirtualMachines",
          term: "P1Y",
          sku: { name: "Standard_B1ls" },
        },
      ],
      savingsPlansToPurchase: [
        {
          appliedScopeProperties: {
            resourceGroupId:
              "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/testrg",
          },
          appliedScopeType: "Single",
          billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
          commitment: { amount: 15.23, currencyCode: "USD", grain: "Hourly" },
          displayName: "ComputeSavingsPlan",
          term: "P1Y",
          sku: { name: "Compute_Savings_Plan" },
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await calculateExchange();
}

main().catch(console.error);
