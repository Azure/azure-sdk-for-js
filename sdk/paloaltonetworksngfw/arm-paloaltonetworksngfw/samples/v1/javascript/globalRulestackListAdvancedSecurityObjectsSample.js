// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the list of advanced security objects
 *
 * @summary Get the list of advanced security objects
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_listAdvancedSecurityObjects_MaximumSet_Gen.json
 */
async function globalRulestackListAdvancedSecurityObjectsMaximumSetGen() {
  const globalRulestackName = "praval";
  const skip = "a6a321";
  const top = 20;
  const typeParam = "globalRulestacks";
  const options = {
    skip,
    top,
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listAdvancedSecurityObjects(
    globalRulestackName,
    typeParam,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Get the list of advanced security objects
 *
 * @summary Get the list of advanced security objects
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/GlobalRulestack_listAdvancedSecurityObjects_MinimumSet_Gen.json
 */
async function globalRulestackListAdvancedSecurityObjectsMinimumSetGen() {
  const globalRulestackName = "praval";
  const typeParam = "globalRulestacks";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.globalRulestack.listAdvancedSecurityObjects(
    globalRulestackName,
    typeParam,
  );
  console.log(result);
}

async function main() {
  await globalRulestackListAdvancedSecurityObjectsMaximumSetGen();
  await globalRulestackListAdvancedSecurityObjectsMinimumSetGen();
}

main().catch(console.error);
