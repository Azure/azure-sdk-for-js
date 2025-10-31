// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a GlobalRulestackResource
 *
 * @summary delete a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function globalRulestackDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.globalRulestack.delete("praval");
}

/**
 * This sample demonstrates how to delete a GlobalRulestackResource
 *
 * @summary delete a GlobalRulestackResource
 * x-ms-original-file: 2025-10-08/GlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function globalRulestackDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.globalRulestack.delete("praval");
}

async function main() {
  await globalRulestackDeleteMaximumSetGen();
  await globalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
