// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the policies for a billing account of Enterprise Agreement type.
 *
 * @summary get the policies for a billing account of Enterprise Agreement type.
 * x-ms-original-file: 2024-04-01/policiesGetByBillingAccount.json
 */
async function policiesGetByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.getByBillingAccount("1234567");
  console.log(result);
}

async function main(): Promise<void> {
  await policiesGetByBillingAccount();
}

main().catch(console.error);
