// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/partnerTransfersGet.json
 */
async function partnerTransferGet(): Promise<void> {
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

async function main(): Promise<void> {
  await partnerTransferGet();
}

main().catch(console.error);
