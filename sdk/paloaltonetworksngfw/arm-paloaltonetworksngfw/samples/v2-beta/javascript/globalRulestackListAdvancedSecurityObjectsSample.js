// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of advanced security objects
 *
 * @summary get the list of advanced security objects
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listAdvancedSecurityObjects_MaximumSet_Gen.json
 */
async function globalRulestackListAdvancedSecurityObjectsMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listAdvancedSecurityObjects(
    "praval",
    "globalRulestacks",
    { skip: "a6a321", top: 20 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the list of advanced security objects
 *
 * @summary get the list of advanced security objects
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listAdvancedSecurityObjects_MinimumSet_Gen.json
 */
async function globalRulestackListAdvancedSecurityObjectsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listAdvancedSecurityObjects(
    "praval",
    "globalRulestacks",
  );
  console.log(result);
}

async function main() {
  await globalRulestackListAdvancedSecurityObjectsMaximumSetGen();
  await globalRulestackListAdvancedSecurityObjectsMinimumSetGen();
}

main().catch(console.error);
