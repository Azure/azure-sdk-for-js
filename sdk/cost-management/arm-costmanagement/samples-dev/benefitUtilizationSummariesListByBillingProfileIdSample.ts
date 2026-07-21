// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists savings plan utilization summaries for billing profile. Supported at grain values: 'Daily' and 'Monthly'.
 *
 * @summary lists savings plan utilization summaries for billing profile. Supported at grain values: 'Daily' and 'Monthly'.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/SavingsPlan-BillingProfile.json
 */
async function savingsPlanUtilizationSummariesBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitUtilizationSummaries.listByBillingProfileId(
    "c0a00000-0e04-5ee3-000e-f0c6e00000ec:c0a00000-0e04-5ee3-000e-f0c6e00000ec",
    "200e5e90-000e-4960-8dcd-8d00a02db000",
    { filter: "properties/usageDate ge 2022-10-15 and properties/usageDate le 2022-10-18" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanUtilizationSummariesBillingProfile();
}

main().catch(console.error);
