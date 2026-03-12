// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a GlobalRulestackResource
 *
 * @summary Delete a GlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_Delete_MaximumSet_Gen.json
 */
async function globalRulestackDeleteMaximumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.beginDeleteAndWait(globalRulestackName);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a GlobalRulestackResource
 *
 * @summary Delete a GlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_Delete_MinimumSet_Gen.json
 */
async function globalRulestackDeleteMinimumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.beginDeleteAndWait(globalRulestackName);
  console.log(result);
}

async function main() {
  await globalRulestackDeleteMaximumSetGen();
  await globalRulestackDeleteMinimumSetGen();
}

main().catch(console.error);
