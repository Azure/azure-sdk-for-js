// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of recommendations for purchasing savings plan.
 *
 * @summary list of recommendations for purchasing savings plan.
 * x-ms-original-file: 2025-03-01/BenefitRecommendationsByBillingAccount.json
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

async function main() {
  await benefitRecommendationsBillingAccountList();
}

main().catch(console.error);
