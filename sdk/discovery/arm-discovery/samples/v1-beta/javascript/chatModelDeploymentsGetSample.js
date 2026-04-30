// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ChatModelDeployment
 *
 * @summary get a ChatModelDeployment
 * x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Get_MaximumSet_Gen.json
 */
async function chatModelDeploymentsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.get(
    "rgdiscovery",
    "715bd6631a63225578",
    "7938c93c6f61d31f7e",
  );
  console.log(result);
}

async function main() {
  await chatModelDeploymentsGetMaximumSet();
}

main().catch(console.error);
