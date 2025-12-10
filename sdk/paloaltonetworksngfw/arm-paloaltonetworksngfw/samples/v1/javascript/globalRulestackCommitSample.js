// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Commit rulestack configuration
 *
 * @summary Commit rulestack configuration
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_commit_MaximumSet_Gen.json
 */
async function globalRulestackCommitMaximumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.beginCommitAndWait(globalRulestackName);
  console.log(result);
}

/**
 * This sample demonstrates how to Commit rulestack configuration
 *
 * @summary Commit rulestack configuration
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_commit_MinimumSet_Gen.json
 */
async function globalRulestackCommitMinimumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.beginCommitAndWait(globalRulestackName);
  console.log(result);
}

async function main() {
  await globalRulestackCommitMaximumSetGen();
  await globalRulestackCommitMinimumSetGen();
}

main().catch(console.error);
