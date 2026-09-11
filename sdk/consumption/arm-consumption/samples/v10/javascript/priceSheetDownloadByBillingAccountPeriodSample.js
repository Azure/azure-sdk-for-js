// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates the pricesheet for the provided billing period asynchronously based on the enrollment id
 *
 * @summary generates the pricesheet for the provided billing period asynchronously based on the enrollment id
 * x-ms-original-file: 2026-06-01/EAPriceSheetForBillingPeriod.json
 */
async function eaPriceSheetForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.priceSheet.downloadByBillingAccountPeriod("0000000", "202305");
  console.log(result);
}

async function main() {
  await eaPriceSheetForBillingPeriod();
}

main().catch(console.error);
