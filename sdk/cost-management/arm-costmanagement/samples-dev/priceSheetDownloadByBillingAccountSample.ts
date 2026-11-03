// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates the pricesheet for the provided billing period asynchronously based on the Enrollment ID. This is for Enterprise Agreement customers.
 *
 * **Migrate to version 2025-03-01**
 *
 * You can use the 2025-03-01 API version with the new URI:
 *
 * '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.CostManagement/pricesheets/default/download'
 *
 * With a new schema detailed below, the new version of the price sheet provides additional information and includes prices for Azure Reserved Instances (RI) for the current billing period. We recommend downloading an Azure Price Sheet for when entering a new billing period if you would maintain an ongoing record of past Azure Reserved Instance (RI) pricing.
 *
 * The EA Azure price sheet is available for billing periods in the past 13 months. To request a price sheet for a billing period older than 13 months, please contact support.
 *
 * The Azure price sheet download experience has been updated from a single .csv file to a zip file containing multiple .csv files, each with max size of 75MB. The 2023-11-01 version has been upgraded to use http POST method; details can be found below.
 *
 * All versions of the Microsoft.Consumption Azure Price Sheet - Download by Billing Account (including 2022-06-01, 2021-10-01, 2020-01-01-preview, 2019-10-01, 2019-05-01) are scheduled to be retired on 01 June 2026 and will no longer be supported after this date.
 *
 * @summary generates the pricesheet for the provided billing period asynchronously based on the Enrollment ID. This is for Enterprise Agreement customers.
 *
 * **Migrate to version 2025-03-01**
 *
 * You can use the 2025-03-01 API version with the new URI:
 *
 * '/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.CostManagement/pricesheets/default/download'
 *
 * With a new schema detailed below, the new version of the price sheet provides additional information and includes prices for Azure Reserved Instances (RI) for the current billing period. We recommend downloading an Azure Price Sheet for when entering a new billing period if you would maintain an ongoing record of past Azure Reserved Instance (RI) pricing.
 *
 * The EA Azure price sheet is available for billing periods in the past 13 months. To request a price sheet for a billing period older than 13 months, please contact support.
 *
 * The Azure price sheet download experience has been updated from a single .csv file to a zip file containing multiple .csv files, each with max size of 75MB. The 2023-11-01 version has been upgraded to use http POST method; details can be found below.
 *
 * All versions of the Microsoft.Consumption Azure Price Sheet - Download by Billing Account (including 2022-06-01, 2021-10-01, 2020-01-01-preview, 2019-10-01, 2019-05-01) are scheduled to be retired on 01 June 2026 and will no longer be supported after this date.
 * x-ms-original-file: 2025-03-01/EAPriceSheetForBillingPeriod.json
 */
async function eaPriceSheetForBillingPeriod(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.priceSheet.downloadByBillingAccount("0000000", "202311");
  console.log(result);
}

async function main(): Promise<void> {
  await eaPriceSheetForBillingPeriod();
}

main().catch(console.error);
