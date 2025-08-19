// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 *
 * @summary Updates the policies for a billing profile. This operation is supported only for billing accounts with agreement type Microsoft Customer Agreement.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/policiesPutByBillingProfile.json
 */

import type { BillingProfilePolicy } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function policiesPutByBillingProfile(): Promise<void> {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const billingProfileName = "xxxx-xxxx-xxx-xxx";
  const parameters: BillingProfilePolicy = {
    properties: {
      invoiceSectionLabelManagement: "Allowed",
      marketplacePurchases: "AllAllowed",
      reservationPurchases: "Allowed",
      savingsPlanPurchases: "Allowed",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.beginCreateOrUpdateByBillingProfileAndWait(
    billingAccountName,
    billingProfileName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await policiesPutByBillingProfile();
}

main().catch(console.error);
