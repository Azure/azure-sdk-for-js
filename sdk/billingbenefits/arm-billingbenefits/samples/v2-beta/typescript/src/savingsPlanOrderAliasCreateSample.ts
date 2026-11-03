// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRP } from "@azure/arm-billingbenefits";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 *
 * @summary create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanOrderAliasCreate.json
 */
async function savingsPlanOrderAliasCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrderAlias.create("spAlias123", {
    appliedScopeType: "Shared",
    billingPlan: "P1M",
    billingScopeId: "/subscriptions/30000000-0000-0000-0000-000000000000",
    commitment: { amount: 0.001, currencyCode: "USD", grain: "Hourly" },
    displayName: "Compute_SavingsPlan_10-28-2022_16-38",
    term: "P3Y",
    sku: { name: "Compute_Savings_Plan" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 *
 * @summary create a savings plan. Learn more about permissions needed at https://go.microsoft.com/fwlink/?linkid=2215851
 * x-ms-original-file: 2025-12-01-preview/SavingsPlanOrderAliasCreateSingleScope.json
 */
async function savingsPlanOrderAliasCreateSingleScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingBenefitsRP(credential);
  const result = await client.savingsPlanOrderAlias.create("spAlias123", {
    appliedScopeProperties: {
      subscriptionId: "/subscriptions/30000000-0000-0000-0000-000000000000",
    },
    appliedScopeType: "Single",
    billingPlan: "P1M",
    billingScopeId:
      "/providers/Microsoft.Billing/billingAccounts/1234567/billingSubscriptions/30000000-0000-0000-0000-000000000000",
    commitment: { amount: 0.001, currencyCode: "USD", grain: "Hourly" },
    displayName: "Compute_SavingsPlan_10-28-2022_16-38",
    term: "P3Y",
    sku: { name: "Compute_Savings_Plan" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanOrderAliasCreate();
  await savingsPlanOrderAliasCreateSingleScope();
}

main().catch(console.error);
