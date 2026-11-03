// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides a list of check access response objects for a department.
 *
 * @summary provides a list of check access response objects for a department.
 * x-ms-original-file: 2024-04-01/checkAccessByDepartment.json
 */
async function checkAccessByDepartment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingPermissions.checkAccessByDepartment(
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "12345",
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
  await checkAccessByDepartment();
}

main().catch(console.error);
