// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a transfer request by ID. The caller must be the recipient of the transfer request.
 *
 * @summary gets a transfer request by ID. The caller must be the recipient of the transfer request.
 * x-ms-original-file: 2024-04-01/recipientTransfersGet.json
 */
async function recipientTransferGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.recipientTransfers.get("aabb123");
  console.log(result);
}

async function main() {
  await recipientTransferGet();
}

main().catch(console.error);
