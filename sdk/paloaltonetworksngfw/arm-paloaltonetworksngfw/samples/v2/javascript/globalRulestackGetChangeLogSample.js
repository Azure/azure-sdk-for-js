// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get changelog
 *
 * @summary get changelog
 * x-ms-original-file: 2025-10-08/GlobalRulestack_getChangeLog_MaximumSet_Gen.json
 */
async function globalRulestackGetChangeLogMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.getChangeLog("praval");
  console.log(result);
}

/**
 * This sample demonstrates how to get changelog
 *
 * @summary get changelog
 * x-ms-original-file: 2025-10-08/GlobalRulestack_getChangeLog_MinimumSet_Gen.json
 */
async function globalRulestackGetChangeLogMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.getChangeLog("praval");
  console.log(result);
}

async function main() {
  await globalRulestackGetChangeLogMaximumSetGen();
  await globalRulestackGetChangeLogMinimumSetGen();
}

main().catch(console.error);
