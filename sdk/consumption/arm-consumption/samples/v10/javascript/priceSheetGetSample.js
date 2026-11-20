// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConsumptionManagementClient } = require("@azure/arm-consumption");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later.
 *
 * @summary gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2026-06-01/PriceSheet.json
 */
async function priceSheet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.priceSheet.get();
  console.log(result);
}

async function main() {
  await priceSheet();
}

main().catch(console.error);
