// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validate savings plan purchase.
 *
 * @summary Validate savings plan purchase.
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanValidatePurchase.json
 */

import type { SavingsPlanPurchaseValidateRequest } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

async function savingsPlanValidatePurchase(): Promise<void> {
  const body: SavingsPlanPurchaseValidateRequest = {
    benefits: [
      {
        appliedScopeProperties: {
          resourceGroupId:
            "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/testrg",
        },
        appliedScopeType: "Single",
        billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
        commitment: { amount: 15.23, currencyCode: "USD", grain: "Hourly" },
        displayName: "ComputeSavingsPlan_2021-07-01",
        sku: { name: "Compute_Savings_Plan" },
        term: "P1Y",
      },
      {
        appliedScopeProperties: {
          resourceGroupId: "/subscriptions/10000000-0000-0000-0000-000000000000/resourceGroups/RG",
        },
        appliedScopeType: "Single",
        billingScopeId: "/subscriptions/10000000-0000-0000-0000-000000000000",
        commitment: { amount: 20, currencyCode: "USD", grain: "Hourly" },
        displayName: "ComputeSavingsPlan_2021-07-01",
        sku: { name: "Compute_Savings_Plan" },
        term: "P1Y",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.validatePurchase(body);
  console.log(result);
}

savingsPlanValidatePurchase().catch(console.error);
