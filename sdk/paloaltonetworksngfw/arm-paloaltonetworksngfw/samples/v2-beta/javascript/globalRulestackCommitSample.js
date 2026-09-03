// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to commit rulestack configuration
 *
 * @summary commit rulestack configuration
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_commit_MaximumSet_Gen.json
 */
async function globalRulestackCommitMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.globalRulestack.commit("praval");
}

/**
 * This sample demonstrates how to commit rulestack configuration
 *
 * @summary commit rulestack configuration
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_commit_MinimumSet_Gen.json
 */
async function globalRulestackCommitMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.globalRulestack.commit("praval");
}

async function main() {
  await globalRulestackCommitMaximumSetGen();
  await globalRulestackCommitMinimumSetGen();
}

main().catch(console.error);
