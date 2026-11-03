// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a transfer request by ID. The caller must be the recipient of the transfer request.
 *
 * @summary gets a transfer request by ID. The caller must be the recipient of the transfer request.
 * x-ms-original-file: 2024-04-01/recipientTransfersGet.json
 */
async function recipientTransferGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.get("aabb123");
  console.log(result);
}

async function main(): Promise<void> {
  await recipientTransferGet();
}

main().catch(console.error);
