// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the savings plan utilization summaries for daily or monthly grain.
 *
 * @summary lists the savings plan utilization summaries for daily or monthly grain.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/SavingsPlan-SavingsPlanOrderId-Daily.json
 */
async function savingsPlanUtilizationSummariesDaily(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitUtilizationSummaries.listBySavingsPlanOrder(
    "66cccc66-6ccc-6c66-666c-66cc6c6c66c6",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanUtilizationSummariesDaily();
}

main().catch(console.error);
