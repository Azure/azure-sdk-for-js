// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later.
 *
 * @summary Gets the price sheet for a subscription. Price sheet is available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/PriceSheet.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function priceSheet(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.priceSheet.get();
  console.log(result);
}

async function main(): Promise<void> {
  await priceSheet();
}

main().catch(console.error);
