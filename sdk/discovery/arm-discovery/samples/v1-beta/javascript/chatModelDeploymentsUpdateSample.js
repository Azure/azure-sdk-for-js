// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ChatModelDeployment
 *
 * @summary update a ChatModelDeployment
 * x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Update_MaximumSet_Gen.json
 */
async function chatModelDeploymentsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.update(
    "rgdiscovery",
    "438970fd7f0137032c",
    "fd0837f1d866060b11",
    { tags: { key6223: "tvufnjfnrdadechkcyoboyrcme" } },
  );
  console.log(result);
}

async function main() {
  await chatModelDeploymentsUpdateMaximumSet();
}

main().catch(console.error);
