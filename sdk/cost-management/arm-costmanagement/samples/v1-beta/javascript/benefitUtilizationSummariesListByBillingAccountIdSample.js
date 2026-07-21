// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists savings plan utilization summaries for the enterprise agreement scope. Supported at grain values: 'Daily' and 'Monthly'.
 *
 * @summary lists savings plan utilization summaries for the enterprise agreement scope. Supported at grain values: 'Daily' and 'Monthly'.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/SavingsPlan-BillingAccount.json
 */
async function savingsPlanUtilizationSummariesBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.benefitUtilizationSummaries.listByBillingAccountId("12345", {
    filter: "properties/usageDate ge 2022-10-15 and properties/usageDate le 2022-10-18",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await savingsPlanUtilizationSummariesBillingAccount();
}

main().catch(console.error);
