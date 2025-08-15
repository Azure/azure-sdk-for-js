// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomersListByBillingAccountOptionalParams } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists the customers that are billed to a billing account. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary Lists the customers that are billed to a billing account. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/customersListByBillingAccount.json
 */
async function customersListByBillingAccount(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.customers.listByBillingAccount(billingAccountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists the customers that are billed to a billing account. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary Lists the customers that are billed to a billing account. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/customersListByBillingAccountWithExpand.json
 */
async function customersListByBillingAccountWithExpand(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const expand = "enabledAzurePlans,resellers";
  const options: CustomersListByBillingAccountOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.customers.listByBillingAccount(billingAccountName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await customersListByBillingAccount();
  await customersListByBillingAccountWithExpand();
}

main().catch(console.error);
