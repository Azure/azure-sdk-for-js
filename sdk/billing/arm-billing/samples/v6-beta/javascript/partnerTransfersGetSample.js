// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BillingManagementClient } = require("@azure/arm-billing");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/partnerTransfersGet.json
 */
async function partnerTransferGet() {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.partnerTransfers.get(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "11111111-1111-1111-1111-111111111111",
    "aabb123",
  );
  console.log(result);
}

async function main() {
  await partnerTransferGet();
}

main().catch(console.error);
