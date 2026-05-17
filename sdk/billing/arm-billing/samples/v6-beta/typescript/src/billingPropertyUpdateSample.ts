// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 *
 * @summary updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 * x-ms-original-file: 2024-04-01/billingPropertyPatchCostCenter.json
 */
async function billingPropertyPatchCostCenter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingProperty.update({ properties: { costCenter: "1010" } });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 *
 * @summary updates the billing property of a subscription. Currently, cost center can be updated for billing accounts with agreement type Microsoft Customer Agreement and subscription service usage address can be updated for billing accounts with agreement type Microsoft Online Service Program.
 * x-ms-original-file: 2024-04-01/billingPropertyPatchSubscriptionServiceUsageAddress.json
 */
async function billingPropertyPatchSubscriptionServiceUsageAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.billingProperty.update({
    properties: {
      subscriptionServiceUsageAddress: {
        addressLine1: "Address line 1",
        addressLine2: "Address line 2",
        city: "City",
        country: "US",
        firstName: "Jenny",
        lastName: "Doe",
        middleName: "Ann",
        postalCode: "12345",
        region: "State",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await billingPropertyPatchCostCenter();
  await billingPropertyPatchSubscriptionServiceUsageAddress();
}

main().catch(console.error);
