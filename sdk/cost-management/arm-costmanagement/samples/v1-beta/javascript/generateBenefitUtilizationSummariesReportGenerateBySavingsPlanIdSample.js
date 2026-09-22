// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers generation of a benefit utilization summaries report for the provided savings plan.
 *
 * @summary triggers generation of a benefit utilization summaries report for the provided savings plan.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/Async/GenerateBenefitUtilizationSummariesReportBySavingsPlan.json
 */
async function generateUtilizationSummariesReportBySavingsPlan() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateBenefitUtilizationSummariesReport.generateBySavingsPlanId(
    "00000000-0000-0000-0000-000000000000",
    "00000000-0000-0000-0000-000000000000",
    {
      endDate: new Date("2022-08-31T00:00:00Z"),
      grain: "Daily",
      startDate: new Date("2022-06-01T00:00:00Z"),
    },
  );
  console.log(result);
}

async function main() {
  await generateUtilizationSummariesReportBySavingsPlan();
}

main().catch(console.error);
