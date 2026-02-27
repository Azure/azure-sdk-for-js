// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ChatModelDeployment
 *
 * @summary update a ChatModelDeployment
 * x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Update_MaximumSet_Gen.json
 */
async function chatModelDeploymentsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.update(
    "rgdiscovery",
    "438970fd7f0137032c",
    "fd0837f1d866060b11",
    { properties: {}, tags: { key6223: "tvufnjfnrdadechkcyoboyrcme" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await chatModelDeploymentsUpdateMaximumSet();
}

main().catch(console.error);
