/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  SavingsPlanUpdateValidateRequest,
  BillingManagementClient,
} from "@azure/arm-billing";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Validate savings plan patch by billing account.
 *
 * @summary Validate savings plan patch by billing account.
 * x-ms-original-file: specification/billing/resource-manager/Microsoft.Billing/stable/2024-04-01/examples/savingsPlanValidateUpdateByBillingAccount.json
 */
async function savingsPlanValidateUpdate() {
  const billingAccountName =
    "00000000-0000-0000-0000-000000000000:00000000-0000-0000-0000-000000000000_2019-05-31";
  const savingsPlanOrderId = "20000000-0000-0000-0000-000000000000";
  const savingsPlanId = "30000000-0000-0000-0000-000000000000";
  const body: SavingsPlanUpdateValidateRequest = {
    benefits: [
      {
        appliedScopeProperties: {
          subscriptionId: "/subscriptions/50000000-0000-0000-0000-000000000000",
        },
        appliedScopeType: "Single",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new BillingManagementClient(credential);
  const result = await client.savingsPlans.validateUpdateByBillingAccount(
    billingAccountName,
    savingsPlanOrderId,
    savingsPlanId,
    body,
  );
  console.log(result);
}

async function main() {
  savingsPlanValidateUpdate();
}

main().catch(console.error);
