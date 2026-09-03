// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to declines a transfer request.
 *
 * @summary declines a transfer request.
 * x-ms-original-file: 2024-04-01/recipientTransfersDecline.json
 */
async function declineTransfer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.decline("aabb123");
  console.log(result);
}

async function main(): Promise<void> {
  await declineTransfer();
}

main().catch(console.error);
