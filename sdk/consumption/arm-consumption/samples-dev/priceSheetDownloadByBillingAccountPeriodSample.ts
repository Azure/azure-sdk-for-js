// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates the pricesheet for the provided billing period asynchronously based on the enrollment id
 *
 * @summary generates the pricesheet for the provided billing period asynchronously based on the enrollment id
 * x-ms-original-file: 2024-08-01/EAPriceSheetForBillingPeriod.json
 */
async function eaPriceSheetForBillingPeriod(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.priceSheet.downloadByBillingAccountPeriod("0000000", "202305");
  console.log(result);
}

async function main(): Promise<void> {
  await eaPriceSheetForBillingPeriod();
}

main().catch(console.error);
