// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Splits a subscription into a new subscription with quantity less than current subscription quantity and not equal to 0.
 *
 * @summary Splits a subscription into a new subscription with quantity less than current subscription quantity and not equal to 0.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingSubscriptionsSplit.json
 */

import type { BillingSubscriptionSplitRequest } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingSubscriptionsSplit(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingSubscriptionName = "11111111-1111-1111-1111-111111111111";
  const parameters: BillingSubscriptionSplitRequest = {
    billingFrequency: "P1M",
    quantity: 1,
    targetProductTypeId: "XYZ56789",
    targetSkuId: "0001",
    termDuration: "P1M",
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingSubscriptions.beginSplitAndWait(
    billingAccountName,
    billingSubscriptionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingSubscriptionsSplit();
}

main().catch(console.error);
