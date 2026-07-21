// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a FqdnListGlobalRulestackResource
 *
 * @summary delete a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.fqdnListGlobalRulestack.delete("praval", "armid1");
}

/**
 * This sample demonstrates how to delete a FqdnListGlobalRulestackResource
 *
 * @summary delete a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2026-05-11-preview/FqdnListGlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.fqdnListGlobalRulestack.delete("praval", "armid1");
}

async function main() {
  await fqdnListGlobalRulestackDeleteMaximumSetGen();
  await fqdnListGlobalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
