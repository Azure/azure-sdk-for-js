// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the policies for a customer at billing account scope. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 *
 * @summary Updates the policies for a customer at billing account scope. This operation is supported only for billing accounts with agreement type Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/policiesPutByCustomerAtBillingAccount.json
 */

import type { CustomerPolicy } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function policiesPutByCustomerAtBillingAccount(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const customerName = "11111111-1111-1111-1111-111111111111";
  const parameters: CustomerPolicy = { properties: { viewCharges: "Allowed" } };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.beginCreateOrUpdateByCustomerAtBillingAccountAndWait(
    billingAccountName,
    customerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await policiesPutByCustomerAtBillingAccount();
}

main().catch(console.error);
