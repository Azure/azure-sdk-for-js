// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Declines a transfer request.
 *
 * @summary Declines a transfer request.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/recipientTransfersDecline.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function declineTransfer(): Promise<void> {
  const transferName = "aabb123";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.decline(transferName);
  console.log(result);
}

async function main(): Promise<void> {
  await declineTransfer();
}

main().catch(console.error);
