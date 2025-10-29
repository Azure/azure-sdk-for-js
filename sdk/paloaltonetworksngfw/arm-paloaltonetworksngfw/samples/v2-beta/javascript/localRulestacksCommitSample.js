// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to commit rulestack configuration
 *
 * @summary commit rulestack configuration
 * x-ms-original-file: 2025-10-08/LocalRulestacks_commit_MaximumSet_Gen.json
 */
async function localRulestacksCommitMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRulestacks.commit("rgopenapi", "lrs1");
}

/**
 * This sample demonstrates how to commit rulestack configuration
 *
 * @summary commit rulestack configuration
 * x-ms-original-file: 2025-10-08/LocalRulestacks_commit_MinimumSet_Gen.json
 */
async function localRulestacksCommitMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRulestacks.commit("rgopenapi", "lrs1");
}

async function main() {
  await localRulestacksCommitMaximumSetGen();
  await localRulestacksCommitMinimumSetGen();
}

main().catch(console.error);
