// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a URL to download the current month's pricesheet for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * You can use the new 2023-09-01 API version for billing periods January 2023 onwards. Azure Reserved Instance (RI) pricing is only available through the new version of the API.
 *
 * Due to Azure product growth, the Azure price sheet download experience in this preview version will be updated from a single csv/json file to a Zip file containing multiple csv/json files, each with max size of 75MB.
 *
 * @summary gets a URL to download the current month's pricesheet for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement.
 *
 * You can use the new 2023-09-01 API version for billing periods January 2023 onwards. Azure Reserved Instance (RI) pricing is only available through the new version of the API.
 *
 * Due to Azure product growth, the Azure price sheet download experience in this preview version will be updated from a single csv/json file to a Zip file containing multiple csv/json files, each with max size of 75MB.
 * x-ms-original-file: 2025-03-01/PricesheetDownloadByBillingProfile.json
 */
async function pricesheetDownloadByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.priceSheet.downloadByBillingProfile(
    "7c05a543-80ff-571e-9f98-1063b3b53cf2:99ad03ad-2d1b-4889-a452-090ad407d25f_2019-05-31",
    "2USN-TPCD-BG7-TGB",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await pricesheetDownloadByBillingProfile();
}

main().catch(console.error);
