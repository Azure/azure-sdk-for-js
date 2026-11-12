// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ChatModelDeployment
 *
 * @summary get a ChatModelDeployment
 * x-ms-original-file: 2026-06-01/ChatModelDeployments_Get_MaximumSet_Gen.json
 */
async function chatModelDeploymentsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.get(
    "rgdiscovery",
    "052733d158d50faa23",
    "4a572f228b6fe04e2a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await chatModelDeploymentsGetMaximumSet();
}

main().catch(console.error);
