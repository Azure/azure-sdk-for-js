// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the policies that are managed by the Billing Admin for the defined subscriptions. This is supported for Microsoft Online Services Program, Microsoft Customer Agreement and Microsoft Partner Agreement.
 *
 * @summary lists the policies that are managed by the Billing Admin for the defined subscriptions. This is supported for Microsoft Online Services Program, Microsoft Customer Agreement and Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/policiesGetBySubscription.json
 */
async function policiesGetBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new BillingManagementClient(credential, subscriptionId);
  const result = await client.policies.getBySubscription();
  console.log(result);
}

async function main(): Promise<void> {
  await policiesGetBySubscription();
}

main().catch(console.error);
