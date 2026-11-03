// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the transfer requests received by the caller.
 *
 * @summary lists the transfer requests received by the caller.
 * x-ms-original-file: 2024-04-01/recipientTransfersList.json
 */
async function recipientTransfersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.recipientTransfers.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await recipientTransfersList();
}

main().catch(console.error);
