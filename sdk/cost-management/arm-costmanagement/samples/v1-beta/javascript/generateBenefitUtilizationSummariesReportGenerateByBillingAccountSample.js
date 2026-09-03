// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers generation of a benefit utilization summaries report for the provided billing account. This API supports only enrollment accounts.
 *
 * @summary triggers generation of a benefit utilization summaries report for the provided billing account. This API supports only enrollment accounts.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/Async/GenerateBenefitUtilizationSummariesReportByBillingAccount.json
 */
async function generateUtilizationSummariesReportByBillingAccount() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateBenefitUtilizationSummariesReport.generateByBillingAccount(
    "8099099",
    {
      endDate: new Date("2022-08-31T00:00:00Z"),
      grain: "Daily",
      kind: "Reservation",
      startDate: new Date("2022-06-01T00:00:00Z"),
    },
  );
  console.log(result);
}

async function main() {
  await generateUtilizationSummariesReportByBillingAccount();
}

main().catch(console.error);
