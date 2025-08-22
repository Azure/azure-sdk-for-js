// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the billing properties for a subscription
 *
 * @summary Gets the billing properties for a subscription
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPropertyGetMCA.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingPropertyGetMca(): Promise<void> {
  const subscriptionId =
    process.env["BILLING_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingPropertyOperations.get();
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the billing properties for a subscription
 *
 * @summary Gets the billing properties for a subscription
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPropertyGetMOSP.json
 */
async function billingPropertyGetMosp(): Promise<void> {
  const subscriptionId =
    process.env["BILLING_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingPropertyOperations.get();
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the billing properties for a subscription
 *
 * @summary Gets the billing properties for a subscription
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingPropertyGetMPA.json
 */
async function billingPropertyGetMpa(): Promise<void> {
  const subscriptionId =
    process.env["BILLING_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingPropertyOperations.get();
  console.log(result);
}

async function main(): Promise<void> {
  await billingPropertyGetMca();
  await billingPropertyGetMosp();
  await billingPropertyGetMpa();
}

main().catch(console.error);
