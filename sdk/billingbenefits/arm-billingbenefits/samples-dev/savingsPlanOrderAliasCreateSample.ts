// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SavingsPlanOrderAliasModel } from "@azure/arm-billingbenefits";
import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 *
 * @summary Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasCreate.json
 */
async function savingsPlanOrderAliasCreate(): Promise<void> {
  const savingsPlanOrderAliasName = "spAlias123";
  const body: SavingsPlanOrderAliasModel = {
    appliedScopeProperties: {},
    appliedScopeType: "Shared",
    billingPlan: "P1M",
    billingScopeId: "/subscriptions/30000000-0000-0000-0000-000000000000",
    commitment: { amount: 0.001, currencyCode: "USD", grain: "Hourly" },
    displayName: "Compute_SavingsPlan_10-28-2022_16-38",
    sku: { name: "Compute_Savings_Plan" },
    term: "P3Y",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrderAlias.beginCreateAndWait(
    savingsPlanOrderAliasName,
    body,
  );
  console.log(result);
}

savingsPlanOrderAliasCreate().catch(console.error);

/**
 * This sample demonstrates how to Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 *
 * @summary Create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 * x-ms-original-file: specification/billingbenefits/resource-manager/Microsoft.BillingBenefits/stable/2022-11-01/examples/SavingsPlanOrderAliasCreateSingleScope.json
 */
async function savingsPlanOrderAliasCreateSingleScope(): Promise<void> {
  const savingsPlanOrderAliasName = "spAlias123";
  const body: SavingsPlanOrderAliasModel = {
    appliedScopeProperties: {
      subscriptionId: "/subscriptions/30000000-0000-0000-0000-000000000000",
    },
    appliedScopeType: "Single",
    billingPlan: "P1M",
    billingScopeId:
      "/providers/Microsoft.Billing/billingAccounts/1234567/billingSubscriptions/30000000-0000-0000-0000-000000000000",
    commitment: { amount: 0.001, currencyCode: "USD", grain: "Hourly" },
    displayName: "Compute_SavingsPlan_10-28-2022_16-38",
    sku: { name: "Compute_Savings_Plan" },
    term: "P3Y",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrderAlias.beginCreateAndWait(
    savingsPlanOrderAliasName,
    body,
  );
  console.log(result);
}

savingsPlanOrderAliasCreateSingleScope().catch(console.error);
