// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates a publisher access token for a SaaS resource.
 *
 * @summary generates a publisher access token for a SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasListAccessToken.json
 */
async function listAccessTokenForASaaSSubscriptionLevelResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1a950b42-75c2-44a6-ab02-fc0f840997aa";
  const client = new SaaSClient(credential, subscriptionId);
  const result = await client.saasSubscriptionLevel.listAccessToken(
    "myResourceGroup",
    "mySaasResource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAccessTokenForASaaSSubscriptionLevelResource();
}

main().catch(console.error);
