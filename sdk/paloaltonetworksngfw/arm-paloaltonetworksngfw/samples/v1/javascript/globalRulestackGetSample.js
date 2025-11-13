// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a GlobalRulestackResource
 *
 * @summary Get a GlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_Get_MaximumSet_Gen.json
 */
async function globalRulestackGetMaximumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.get(globalRulestackName);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a GlobalRulestackResource
 *
 * @summary Get a GlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_Get_MinimumSet_Gen.json
 */
async function globalRulestackGetMinimumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.get(globalRulestackName);
  console.log(result);
}

async function main() {
  await globalRulestackGetMaximumSetGen();
  await globalRulestackGetMinimumSetGen();
}

main().catch(console.error);
