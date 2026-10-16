// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later.
 *
 * @summary get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/PriceSheetExpand.json
 */
async function priceSheetExpand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.priceSheet.getByBillingPeriod("201801", { expand: "meterDetails" });
  console.log(result);
}

/**
 * This sample demonstrates how to get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later.
 *
 * @summary get the price sheet for a scope by subscriptionId and billing period. Price sheet is available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/PriceSheetForBillingPeriod.json
 */
async function priceSheetForBillingPeriod() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.priceSheet.getByBillingPeriod("201801");
  console.log(result);
}

async function main() {
  await priceSheetExpand();
  await priceSheetForBillingPeriod();
}

main().catch(console.error);
