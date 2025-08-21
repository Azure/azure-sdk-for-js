// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists savings plan utilization summaries for billing profile. Supported at grain values: 'Daily' and 'Monthly'.
 *
 * @summary Lists savings plan utilization summaries for billing profile. Supported at grain values: 'Daily' and 'Monthly'.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/BenefitUtilizationSummaries/SavingsPlan-BillingProfile.json
 */

import type { BenefitUtilizationSummariesListByBillingProfileIdOptionalParams } from "@azure/arm-costmanagement";
import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function savingsPlanUtilizationSummariesBillingProfile(): Promise<void> {
  const billingAccountId =
    "c0a00000-0e04-5ee3-000e-f0c6e00000ec:c0a00000-0e04-5ee3-000e-f0c6e00000ec";
  const billingProfileId = "200e5e90-000e-4960-8dcd-8d00a02db000";
  const filter = "properties/usageDate ge 2022-10-15 and properties/usageDate le 2022-10-18";
  const options: BenefitUtilizationSummariesListByBillingProfileIdOptionalParams = {
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitUtilizationSummaries.listByBillingProfileId(
    billingAccountId,
    billingProfileId,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanUtilizationSummariesBillingProfile();
}

main().catch(console.error);
