// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a SaaS resource by its name.
 *
 * @summary gets a SaaS resource by its name.
 * x-ms-original-file: 2026-04-01/SaasGet.json
 */
async function getASaaSSubscriptionLevelResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.get("myResourceGroup", "mySaasResource");
  console.log(result);
}

async function main(): Promise<void> {
  await getASaaSSubscriptionLevelResource();
}

main().catch(console.error);
