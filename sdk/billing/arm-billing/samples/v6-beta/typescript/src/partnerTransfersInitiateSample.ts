// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sends a request to a user in a customer's billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary sends a request to a user in a customer's billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/partnerTransfersInitiate.json
 */
async function initiatePartnerTransfer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.partnerTransfers.initiate(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "11111111-1111-1111-1111-111111111111",
    "aabb123",
    { recipientEmailId: "user@contoso.com" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await initiatePartnerTransfer();
}

main().catch(console.error);
