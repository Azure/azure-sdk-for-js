// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update savings plan.
 *
 * @summary Update savings plan.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanUpdate.json
 */

import type { SavingsPlanUpdateRequest } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanUpdate(): Promise<void> {
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const body: SavingsPlanUpdateRequest = {
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
          sku: { name: "Compute_Savings_Plan" },
          term: "P1Y",
        },
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlan.update(savingsPlanOrderId, savingsPlanId, body);
  console.log(result);
}

savingsPlanUpdate().catch(console.error);
