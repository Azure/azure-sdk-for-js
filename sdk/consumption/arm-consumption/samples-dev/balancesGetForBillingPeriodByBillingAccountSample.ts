// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later.
 *
 * @summary Gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/BalancesByBillingAccountForBillingPeriod.json
 */

import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function balances(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const billingAccountId = "123456";
  const billingPeriodName = "201702";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const result = await client.balances.getForBillingPeriodByBillingAccount(
    billingAccountId,
    billingPeriodName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await balances();
}

main().catch(console.error);
