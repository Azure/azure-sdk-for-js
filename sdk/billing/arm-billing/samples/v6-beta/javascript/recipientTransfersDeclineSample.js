// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to declines a transfer request.
 *
 * @summary declines a transfer request.
 * x-ms-original-file: 2024-04-01/recipientTransfersDecline.json
 */
async function declineTransfer() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.decline("aabb123");
  console.log(result);
}

async function main() {
  await declineTransfer();
}

main().catch(console.error);
