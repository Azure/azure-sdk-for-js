// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List predefined URL categories for rulestack
 *
 * @summary List predefined URL categories for rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_listPredefinedUrlCategories_MaximumSet_Gen.json
 */
async function globalRulestackListPredefinedUrlCategoriesMaximumSetGen() {
  const globalRulestackName = "praval";
  const skip = "a6a321";
  const top = 20;
  const options = {
    skip,
    top,
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listPredefinedUrlCategories(
    globalRulestackName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to List predefined URL categories for rulestack
 *
 * @summary List predefined URL categories for rulestack
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_listPredefinedUrlCategories_MinimumSet_Gen.json
 */
async function globalRulestackListPredefinedUrlCategoriesMinimumSetGen() {
  const globalRulestackName = "praval";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listPredefinedUrlCategories(globalRulestackName);
  console.log(result);
}

async function main() {
  await globalRulestackListPredefinedUrlCategoriesMaximumSetGen();
  await globalRulestackListPredefinedUrlCategoriesMinimumSetGen();
}

main().catch(console.error);
