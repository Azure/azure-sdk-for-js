// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a billing profile by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement.
 *
 * @summary gets a billing profile by its ID. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement.
 * x-ms-original-file: 2024-04-01/billingProfilesGet.json
 */
async function billingProfilesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.billingProfiles.get(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await billingProfilesGet();
}

main().catch(console.error);
