// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ChatModelDeployment
 *
 * @summary delete a ChatModelDeployment
 * x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Delete_MaximumSet_Gen.json
 */
async function chatModelDeploymentsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.chatModelDeployments.delete(
    "rgdiscovery",
    "015403a79d07536250",
    "7a1ee53e20d918a13d",
  );
}

async function main(): Promise<void> {
  await chatModelDeploymentsDeleteMaximumSet();
}

main().catch(console.error);
