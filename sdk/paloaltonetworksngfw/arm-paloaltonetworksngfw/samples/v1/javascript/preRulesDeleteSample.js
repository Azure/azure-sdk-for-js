// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete a PreRulesResource
 *
 * @summary Delete a PreRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PreRules_Delete_MaximumSet_Gen.json
 */
async function preRulesDeleteMaximumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.beginDeleteAndWait(globalRulestackName, priority);
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a PreRulesResource
 *
 * @summary Delete a PreRulesResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2025-10-08/examples/PreRules_Delete_MinimumSet_Gen.json
 */
async function preRulesDeleteMinimumSetGen() {
  const globalRulestackName = "lrs1";
  const priority = "1";
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.preRules.beginDeleteAndWait(globalRulestackName, priority);
  console.log(result);
}

async function main() {
  await preRulesDeleteMaximumSetGen();
  await preRulesDeleteMinimumSetGen();
}

main().catch(console.error);
