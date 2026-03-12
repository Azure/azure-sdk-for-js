// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List of recommendations for purchasing savings plan.
 *
 * @summary List of recommendations for purchasing savings plan.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/BenefitRecommendationsByBillingAccount.json
 */

import type { BenefitRecommendationsListOptionalParams } from "@azure/arm-costmanagement";
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function benefitRecommendationsBillingAccountList(): Promise<void> {
  const filter = "properties/lookBackPeriod eq 'Last7Days' AND properties/term eq 'P1Y'";
  const expand = "properties/usage,properties/allRecommendationDetails";
  const billingScope = "providers/Microsoft.Billing/billingAccounts/123456";
  const options: BenefitRecommendationsListOptionalParams = { filter, expand };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitRecommendations.list(billingScope, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await benefitRecommendationsBillingAccountList();
}

main().catch(console.error);
