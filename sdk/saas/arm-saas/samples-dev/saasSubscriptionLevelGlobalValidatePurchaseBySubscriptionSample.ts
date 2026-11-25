// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates a proposed SaaS purchase at subscription scope before a resource group is selected.
 *
 * @summary validates a proposed SaaS purchase at subscription scope before a resource group is selected.
 * x-ms-original-file: 2026-04-01/SaasValidatePurchaseBySubscription.json
 */
async function validateASaaSPurchaseAtSubscriptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevelGlobal.validatePurchaseBySubscription({
    location: "global",
    properties: {
      name: "mySaasResource",
      quantity: 1,
      autoRenew: true,
      storefront: "AzurePortal",
      productCode: "0007150b-0000-0160-2654-64a36bcef7ba",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validateASaaSPurchaseAtSubscriptionScope();
}

main().catch(console.error);
