// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates if a subscription or a reservation can be transferred. Use this operation to validate your subscriptions or reservation before using the accept transfer operation.
 *
 * @summary validates if a subscription or a reservation can be transferred. Use this operation to validate your subscriptions or reservation before using the accept transfer operation.
 * x-ms-original-file: 2024-04-01/recipientTransfersValidate.json
 */
async function validateTransfer() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.validate("aabb123", {
    productDetails: [
      { productId: "subscriptionId", productType: "AzureSubscription" },
      { productId: "reservedInstanceId", productType: "AzureReservation" },
    ],
  });
  console.log(result);
}

async function main() {
  await validateTransfer();
}

main().catch(console.error);
