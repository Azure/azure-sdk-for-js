// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update savings plan by billing account.
 *
 * @summary update savings plan by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanUpdateByBillingAccount.json
 */
async function savingsPlanUpdate() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.updateByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
    {
      properties: {
        appliedScopeProperties: {
          managementGroupId: "/providers/Microsoft.Management/managementGroups/mg1",
          tenantId: "80000000-0000-0000-0000-000000000000",
        },
        appliedScopeType: "ManagementGroup",
        displayName: "sp_newName",
        renew: true,
        renewProperties: {
          purchaseProperties: {
            appliedScopeProperties: {
              managementGroupId: "/providers/Microsoft.Management/managementGroups/mg1",
              tenantId: "80000000-0000-0000-0000-000000000000",
            },
            appliedScopeType: "ManagementGroup",
            billingPlan: "P1M",
            billingScopeId: "/subscriptions/50000000-0000-0000-0000-000000000000",
            commitment: { amount: 0.001, currencyCode: "USD", grain: "Hourly" },
            displayName: "sp_newName_renewed",
            term: "P3Y",
            sku: { name: "Compute_Savings_Plan" },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await savingsPlanUpdate();
}

main().catch(console.error);
