// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks whether a proposed SaaS resource name is available.
 *
 * @summary checks whether a proposed SaaS resource name is available.
 * x-ms-original-file: 2026-04-01/SaasCheckNameAvailability.json
 */
async function checkNameAvailabilityForASaaSResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevelGlobal.checkNameAvailability({
    name: "/subscriptions/1a950b42-75c2-44a6-ab02-fc0f840997aa/resourceGroups/myResourceGroup/providers/Microsoft.SaaS/resources/mySaasResource",
    type: "Microsoft.SaaS/resources",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailabilityForASaaSResource();
}

main().catch(console.error);
