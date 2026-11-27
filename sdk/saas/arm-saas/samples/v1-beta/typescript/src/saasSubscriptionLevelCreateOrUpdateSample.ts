// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a SaaS resource.
 *
 * @summary creates or updates a SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasPut.json
 */
async function createASaaSSubscriptionLevelResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.createOrUpdate(
    "myResourceGroup",
    "mySaasResource",
    {
      location: "global",
      tags: { environment: "test" },
      properties: {
        description: "Contoso SaaS seat subscription",
        quantity: 1,
        autoRenew: true,
        storefront: "AzurePortal",
        quoteId: "11d0b05ae5a5",
        productCode: "0007150b-0000-0160-2654-64a36bcef7ba",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createASaaSSubscriptionLevelResource();
}

main().catch(console.error);
