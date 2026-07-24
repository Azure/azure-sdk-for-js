// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ChatModelDeployment
 *
 * @summary update a ChatModelDeployment
 * x-ms-original-file: 2026-06-01/ChatModelDeployments_Update_MaximumSet_Gen.json
 */
async function chatModelDeploymentsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.chatModelDeployments.update(
    "rgdiscovery",
    "308882f04c9bcf36d5",
    "985d52cec9acb72ebe",
    { tags: { key5692: "gayu" } },
  );
  console.log(result);
}

async function main() {
  await chatModelDeploymentsUpdateMaximumSet();
}

main().catch(console.error);
