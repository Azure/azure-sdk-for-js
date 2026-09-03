// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingBenefitsRP } = require("@azure/arm-billingbenefits");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a reservation order alias.
 *
 * @summary create a reservation order alias.
 * x-ms-original-file: 2025-12-01-preview/ReservationOrderAliasCreate.json
 */
async function reservationOrderAliasCreate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.reservationOrderAlias.create("reservationOrderAlias123", {
    location: "eastus",
    appliedScopeProperties: {
      resourceGroupId: "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/testrg",
    },
    appliedScopeType: "Single",
    billingPlan: "P1M",
    billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
    displayName: "ReservationOrder_2022-06-02",
    quantity: 5,
    renew: true,
    reservedResourceProperties: { instanceFlexibility: "On" },
    reservedResourceType: "VirtualMachines",
    term: "P1Y",
    sku: { name: "Standard_M64s_v2" },
  });
  console.log(result);
}

async function main() {
  await reservationOrderAliasCreate();
}

main().catch(console.error);
