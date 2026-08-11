// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of recommendations for purchasing savings plan.
 *
 * @summary list of recommendations for purchasing savings plan.
 * x-ms-original-file: 2026-06-01/BenefitRecommendationsByBillingAccount.json
 */
async function benefitRecommendationsBillingAccountList() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitRecommendations.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
    {
      filter: "properties/lookBackPeriod eq 'Last7Days' AND properties/term eq 'P1Y'",
      expand: "properties/usage,properties/allRecommendationDetails",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list of recommendations for purchasing savings plan.
 *
 * @summary list of recommendations for purchasing savings plan.
 * x-ms-original-file: 2026-06-01/BenefitRecommendationsByBillingAccountForManagementGroup.json
 */
async function benefitRecommendationsManagementGroupList() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitRecommendations.list(
    "providers/Microsoft.Billing/billingAccounts/123456",
    {
      filter:
        "properties/scope eq 'ManagementGroup' AND properties/managementGroupId eq '/providers/Microsoft.Management/managementGroups/00000000-0000-0000-0000-000000000001' AND properties/lookBackPeriod eq 'Last7Days' AND properties/term eq 'P1Y'",
      expand: "properties/usage,properties/allRecommendationDetails",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await benefitRecommendationsBillingAccountList();
  await benefitRecommendationsManagementGroupList();
}

main().catch(console.error);
