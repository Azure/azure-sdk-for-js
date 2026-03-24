// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to accepts a transfer request.
 *
 * @summary accepts a transfer request.
 * x-ms-original-file: 2024-04-01/recipientTransfersAccept.json
 */
async function acceptTransfer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.accept("aabb123", {
    productDetails: [
      { productId: "subscriptionId", productType: "AzureSubscription" },
      { productId: "reservedInstanceId", productType: "AzureReservation" },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await acceptTransfer();
}

main().catch(console.error);
