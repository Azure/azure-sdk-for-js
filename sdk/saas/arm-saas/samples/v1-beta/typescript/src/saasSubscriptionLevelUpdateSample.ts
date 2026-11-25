// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates mutable properties or tags on an existing SaaS resource.
 *
 * @summary updates mutable properties or tags on an existing SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasPatch.json
 */
async function changePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.update("myResourceGroup", "mySaasResource", {
    properties: { productCode: "0007150b-0000-0160-2654-64a36bcef7ba", intent: "Retain" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates mutable properties or tags on an existing SaaS resource.
 *
 * @summary updates mutable properties or tags on an existing SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasPatchQuantity.json
 */
async function changeQuantity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.update("myResourceGroup", "mySaasResource", {
    properties: { quantity: 5 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await changePlan();
  await changeQuantity();
}

main().catch(console.error);
