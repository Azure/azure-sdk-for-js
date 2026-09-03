// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to all rules approved in the private store that are relevant for user subscriptions
 *
 * @summary all rules approved in the private store that are relevant for user subscriptions
 * x-ms-original-file: 2025-01-01/QueryUserRules.json
 */
async function queryUserRules(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.queryUserRules("a0e28e55-90c4-41d8-8e34-bb7ef7775406", {
    payload: { subscriptionIds: ["b340914e-353d-453a-85fb-8f9b65b51f91"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await queryUserRules();
}

main().catch(console.error);
