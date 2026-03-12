// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the policies for a billing account of Enterprise Agreement type.
 *
 * @summary Update the policies for a billing account of Enterprise Agreement type.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/policiesPutByBillingAccount.json
 */

import type { BillingAccountPolicy } from "@azure/arm-billing";
import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function policiesPutByBillingAccount(): Promise<void> {
  const billingAccountName = "1234567";
  const parameters: BillingAccountPolicy = {
    properties: {
      enterpriseAgreementPolicies: {
        authenticationType: "OrganizationalAccountOnly",
      },
      marketplacePurchases: "AllAllowed",
      reservationPurchases: "Allowed",
      savingsPlanPurchases: "NotAllowed",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.beginCreateOrUpdateByBillingAccountAndWait(
    billingAccountName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await policiesPutByBillingAccount();
}

main().catch(console.error);
