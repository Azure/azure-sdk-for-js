// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the savings plan utilization summaries for daily or monthly grain.
 *
 * @summary Lists the savings plan utilization summaries for daily or monthly grain.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/BenefitUtilizationSummaries/SavingsPlan-SavingsPlanOrderId-Daily.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function savingsPlanUtilizationSummariesDaily(): Promise<void> {
  const savingsPlanOrderId = "66cccc66-6ccc-6c66-666c-66cc6c6c66c6";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitUtilizationSummaries.listBySavingsPlanOrder(
    savingsPlanOrderId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await savingsPlanUtilizationSummariesDaily();
}

main().catch(console.error);
