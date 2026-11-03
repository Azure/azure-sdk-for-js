// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the policies for a billing account of Enterprise Agreement type.
 *
 * @summary update the policies for a billing account of Enterprise Agreement type.
 * x-ms-original-file: 2024-04-01/policiesPutByBillingAccount.json
 */
async function policiesPutByBillingAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.policies.createOrUpdateByBillingAccount("1234567", {
    properties: {
      enterpriseAgreementPolicies: { authenticationType: "OrganizationalAccountOnly" },
      marketplacePurchases: "AllAllowed",
      reservationPurchases: "Allowed",
      savingsPlanPurchases: "NotAllowed",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await policiesPutByBillingAccount();
}

main().catch(console.error);
