// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides a list of check access response objects for a customer.
 *
 * @summary provides a list of check access response objects for a customer.
 * x-ms-original-file: 2024-04-01/checkAccessByCustomer.json
 */
async function checkAccessByCustomer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingPermissions.checkAccessByCustomer(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    "703ab484-dda2-4402-827b-a74513b61e2d",
    {
      actions: [
        "Microsoft.Billing/billingAccounts/read",
        "Microsoft.Subscription/subscriptions/write",
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkAccessByCustomer();
}

main().catch(console.error);
