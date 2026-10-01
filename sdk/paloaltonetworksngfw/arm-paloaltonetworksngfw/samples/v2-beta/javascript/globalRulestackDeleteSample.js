// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a GlobalRulestackResource
 *
 * @summary delete a GlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function globalRulestackDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.globalRulestack.delete("praval");
}

/**
 * This sample demonstrates how to delete a GlobalRulestackResource
 *
 * @summary delete a GlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/GlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function globalRulestackDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.globalRulestack.delete("praval");
}

async function main() {
  await globalRulestackDeleteMaximumSetGen();
  await globalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
