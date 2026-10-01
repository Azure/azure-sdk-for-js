// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update savings plan.
 *
 * @summary update savings plan.
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanUpdate.json
 */
async function savingsPlanUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlan.update(
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
    {
      properties: {
        appliedScopeProperties: {
          resourceGroupId:
            "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/testrg",
        },
        appliedScopeType: "Single",
        displayName: "TestDisplayName",
        renew: true,
        renewProperties: {
          purchaseProperties: {
            appliedScopeProperties: {
              resourceGroupId:
                "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/testrg",
            },
            appliedScopeType: "Single",
            billingPlan: "P1M",
            billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
            commitment: { amount: 15.23, currencyCode: "USD", grain: "Hourly" },
            displayName: "TestDisplayName_renewed",
            renew: false,
            term: "P1Y",
            sku: { name: "Compute_Savings_Plan" },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanUpdate();
}

main().catch(console.error);
