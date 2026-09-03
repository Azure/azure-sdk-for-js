// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers generation of a benefit utilization summaries report for the provided billing account and billing profile.
 *
 * @summary triggers generation of a benefit utilization summaries report for the provided billing account and billing profile.
 * x-ms-original-file: 2025-03-01/BenefitUtilizationSummaries/Async/GenerateBenefitUtilizationSummariesReportByBillingProfile.json
 */
async function generateUtilizationSummariesReportByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.generateBenefitUtilizationSummariesReport.generateByBillingProfile(
    "00000000-0000-0000-0000-000000000000",
    "CZSFR-SDFXC-DSDF",
    {
      endDate: new Date("2022-08-31T00:00:00Z"),
      grain: "Daily",
      kind: "Reservation",
      startDate: new Date("2022-06-01T00:00:00Z"),
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateUtilizationSummariesReportByBillingProfile();
}

main().catch(console.error);
