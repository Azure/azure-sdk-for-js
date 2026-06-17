// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later.
 *
 * @summary gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: 2024-08-01/BalancesByBillingAccountForBillingPeriod.json
 */
async function balances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential);
  const result = await client.balances.getForBillingPeriodByBillingAccount("123456", "201702");
  console.log(result);
}

async function main(): Promise<void> {
  await balances();
}

main().catch(console.error);
