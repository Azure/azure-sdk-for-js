// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AcceptTransferRequest } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validates if a subscription or a reservation can be transferred. Use this operation to validate your subscriptions or reservation before using the accept transfer operation.
 *
 * @summary Validates if a subscription or a reservation can be transferred. Use this operation to validate your subscriptions or reservation before using the accept transfer operation.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/recipientTransfersValidate.json
 */
async function validateTransfer(): Promise<void> {
  const transferName = "aabb123";
  const parameters: AcceptTransferRequest = {
    productDetails: [
      { productId: "subscriptionId", productType: "AzureSubscription" },
      { productId: "reservedInstanceId", productType: "AzureReservation" },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.validate(transferName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await validateTransfer();
}

main().catch(console.error);
