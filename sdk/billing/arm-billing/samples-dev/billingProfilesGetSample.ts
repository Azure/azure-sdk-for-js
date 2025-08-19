// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a billing profile by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement.
 *
 * @summary Gets a billing profile by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/billingProfilesGet.json
 */

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function billingProfilesGet(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingProfiles.get(billingAccountName, billingProfileName);
  console.log(result);
}

async function main(): Promise<void> {
  await billingProfilesGet();
}

main().catch(console.error);
