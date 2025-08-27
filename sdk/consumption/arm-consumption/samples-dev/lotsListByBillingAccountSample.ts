// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all Azure credits and Microsoft Azure consumption commitments for a billing account or a billing profile. Microsoft Azure consumption commitments are only supported for the billing account scope.
 *
 * @summary Lists all Azure credits and Microsoft Azure consumption commitments for a billing account or a billing profile. Microsoft Azure consumption commitments are only supported for the billing account scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/LotsListByBillingAccount.json
 */

import type { LotsListByBillingAccountOptionalParams } from "@azure/arm-consumption";
import { ConsumptionManagementClient } from "@azure/arm-consumption";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function lotsListByBillingAccount(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const billingAccountId = "1234:5678";
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount(billingAccountId)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all Azure credits and Microsoft Azure consumption commitments for a billing account or a billing profile. Microsoft Azure consumption commitments are only supported for the billing account scope.
 *
 * @summary Lists all Azure credits and Microsoft Azure consumption commitments for a billing account or a billing profile. Microsoft Azure consumption commitments are only supported for the billing account scope.
 * x-ms-original-file: specification/consumption/resource-manager/Microsoft.Consumption/stable/2021-10-01/examples/LotsListByBillingAccountWithFilters.json
 */
async function lotsListByBillingAccountWithStatusFilter(): Promise<void> {
  const subscriptionId =
    process.env["CONSUMPTION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const billingAccountId = "1234:5678";
  const filter = "status eq 'active' AND source eq 'consumptioncommitment'";
  const options: LotsListByBillingAccountOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new ConsumptionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.lotsOperations.listByBillingAccount(billingAccountId, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await lotsListByBillingAccount();
  await lotsListByBillingAccountWithStatusFilter();
}

main().catch(console.error);
