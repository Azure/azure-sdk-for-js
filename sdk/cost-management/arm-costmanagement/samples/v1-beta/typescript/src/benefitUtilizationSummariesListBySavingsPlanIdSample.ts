// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the savings plan utilization summaries for daily or monthly grain.
 *
 * @summary lists the savings plan utilization summaries for daily or monthly grain.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/SavingsPlan-SavingsPlanId-Monthly.json
 */
async function savingsPlanUtilizationSummariesMonthlyWithSavingsPlanId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitUtilizationSummaries.listBySavingsPlanId(
    "66cccc66-6ccc-6c66-666c-66cc6c6c66c6",
    "222d22dd-d2d2-2dd2-222d-2dd2222ddddd",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanUtilizationSummariesMonthlyWithSavingsPlanId();
}

main().catch(console.error);
