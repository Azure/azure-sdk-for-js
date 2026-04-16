// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a FqdnListGlobalRulestackResource
 *
 * @summary Get a FqdnListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/FqdnListGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackGetMaximumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a FqdnListGlobalRulestackResource
 *
 * @summary Get a FqdnListGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/FqdnListGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackGetMinimumSetGen() {
  const globalRulestackName = "praval";
  const name = "armid1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.fqdnListGlobalRulestack.get(globalRulestackName, name);
  console.log(result);
}

async function main() {
  await fqdnListGlobalRulestackGetMaximumSetGen();
  await fqdnListGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
