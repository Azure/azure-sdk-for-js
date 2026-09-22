// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary updates the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: 2024-04-01/policiesPutByBillingProfile.json
 */
async function policiesPutByBillingProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.createOrUpdateByBillingProfile(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "xxxx-xxxx-xxx-xxx",
    {
      properties: {
        invoiceSectionLabelManagement: "Allowed",
        marketplacePurchases: "AllAllowed",
        reservationPurchases: "Allowed",
        savingsPlanPurchases: "Allowed",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await policiesPutByBillingProfile();
}

main().catch(console.error);
