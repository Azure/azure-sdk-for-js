// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the billing properties for a subscription
 *
 * @summary gets the billing properties for a subscription
 * x-ms-original-file: 2024-04-01/billingPropertyGetMCA.json
 */
async function billingPropertyGetMCA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingProperty.get();
  console.log(result);
}

/**
 * This sample demonstrates how to gets the billing properties for a subscription
 *
 * @summary gets the billing properties for a subscription
 * x-ms-original-file: 2024-04-01/billingPropertyGetMOSP.json
 */
async function billingPropertyGetMosp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingProperty.get();
  console.log(result);
}

/**
 * This sample demonstrates how to gets the billing properties for a subscription
 *
 * @summary gets the billing properties for a subscription
 * x-ms-original-file: 2024-04-01/billingPropertyGetMPA.json
 */
async function billingPropertyGetMPA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingProperty.get();
  console.log(result);
}

async function main(): Promise<void> {
  await billingPropertyGetMCA();
  await billingPropertyGetMosp();
  await billingPropertyGetMPA();
}

main().catch(console.error);
