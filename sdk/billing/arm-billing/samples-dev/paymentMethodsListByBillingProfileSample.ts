// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists payment methods attached to a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Lists payment methods attached to a billing profile. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/paymentMethodsListByBillingProfile.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function paymentMethodsListByBillingProfile(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000032:00000000-0000-0000-0000-000000000099_2019-05-31";
  const billingProfileName = "ABC1-A1CD-AB1-BP1";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.paymentMethods.listByBillingProfile(
    billingAccountName,
    billingProfileName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await paymentMethodsListByBillingProfile();
}

main().catch(console.error);
