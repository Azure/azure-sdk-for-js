// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CheckAccessRequest } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Provides a list of check access response objects for a department.
 *
 * @summary Provides a list of check access response objects for a department.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/checkAccessByDepartment.json
 */
async function checkAccessByDepartment(): Promise<void> {
  const billingAccountName =
    "10000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const departmentName = "12345";
  const parameters: CheckAccessRequest = {
    actions: [
      "Microsoft.Billing/billingAccounts/read",
      "Microsoft.Subscription/subscriptions/write",
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingPermissions.checkAccessByDepartment(
    billingAccountName,
    departmentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkAccessByDepartment();
}

main().catch(console.error);
