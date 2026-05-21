// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingManagementClient } from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validate savings plan patch by billing account.
 *
 * @summary validate savings plan patch by billing account.
 * x-ms-original-file: 2024-04-01/savingsPlanValidateUpdateByBillingAccount.json
 */
async function savingsPlanValidateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.validateUpdateByBillingAccount(
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31",
    "20000000-0000-0000-0000-000000000000",
    "30000000-0000-0000-0000-000000000000",
    {
      benefits: [
        {
          appliedScopeProperties: {
            subscriptionId: "/subscriptions/50000000-0000-0000-0000-000000000000",
          },
          appliedScopeType: "Single",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await savingsPlanValidateUpdate();
}

main().catch(console.error);
