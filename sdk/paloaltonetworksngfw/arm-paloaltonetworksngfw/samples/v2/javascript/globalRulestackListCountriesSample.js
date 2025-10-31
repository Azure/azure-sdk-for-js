// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list of countries for Rulestack
 *
 * @summary list of countries for Rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listCountries_MaximumSet_Gen.json
 */
async function globalRulestackListCountriesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listCountries("praval", {
    skip: "a6a321",
    top: 20,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list of countries for Rulestack
 *
 * @summary list of countries for Rulestack
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listCountries_MinimumSet_Gen.json
 */
async function globalRulestackListCountriesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listCountries("praval");
  console.log(result);
}

async function main() {
  await globalRulestackListCountriesMaximumSetGen();
  await globalRulestackListCountriesMinimumSetGen();
}

main().catch(console.error);
