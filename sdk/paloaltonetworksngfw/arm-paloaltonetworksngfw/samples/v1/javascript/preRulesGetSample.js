// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get a PreRulesResource
 *
 * @summary Get a PreRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PreRules_Get_MaximumSet_Gen.json
 */
async function preRulesGetMaximumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.get(globalRulestackName, priority);
  console.log(result);
}

/**
 * This sample demonstrates how to Get a PreRulesResource
 *
 * @summary Get a PreRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PreRules_Get_MinimumSet_Gen.json
 */
async function preRulesGetMinimumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.get(globalRulestackName, priority);
  console.log(result);
}

async function main() {
  await preRulesGetMaximumSetGen();
  await preRulesGetMinimumSetGen();
}

main().catch(console.error);
