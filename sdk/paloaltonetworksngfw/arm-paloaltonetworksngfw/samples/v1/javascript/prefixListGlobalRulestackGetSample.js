// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a PrefixListGlobalRulestackResource
 *
 * @summary Get a PrefixListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PrefixListGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function prefixListGlobalRulestackGetMaximumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.prefixListGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a PrefixListGlobalRulestackResource
 *
 * @summary Get a PrefixListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PrefixListGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function prefixListGlobalRulestackGetMinimumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.prefixListGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

async function main() {
  await prefixListGlobalRulestackGetMaximumSetGen();
  await prefixListGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
