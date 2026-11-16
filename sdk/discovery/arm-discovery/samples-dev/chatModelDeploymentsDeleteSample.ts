// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ChatModelDeployment
 *
 * @summary delete a ChatModelDeployment
 * x-ms-original-file: 2026-06-01/ChatModelDeployments_Delete_MaximumSet_Gen.json
 */
async function chatModelDeploymentsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.chatModelDeployments.delete(
    "rgdiscovery",
    "b8412416e166a6c264",
    "aaf6134e93bb6af594",
  );
}

async function main(): Promise<void> {
  await chatModelDeploymentsDeleteMaximumSet();
}

main().catch(console.error);
