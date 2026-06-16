// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PrefixListGlobalRulestackResource
 *
 * @summary delete a PrefixListGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/PrefixListGlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function prefixListGlobalRulestackDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.prefixListGlobalRulestack.delete("praval", "armid1");
}

/**
 * This sample demonstrates how to delete a PrefixListGlobalRulestackResource
 *
 * @summary delete a PrefixListGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/PrefixListGlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function prefixListGlobalRulestackDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.prefixListGlobalRulestack.delete("praval", "armid1");
}

async function main() {
  await prefixListGlobalRulestackDeleteMaximumSetGen();
  await prefixListGlobalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
