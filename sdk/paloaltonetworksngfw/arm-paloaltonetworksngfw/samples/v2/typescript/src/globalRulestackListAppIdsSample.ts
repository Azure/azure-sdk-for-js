// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list of AppIds for GlobalRulestack ApiVersion
 *
 * @summary list of AppIds for GlobalRulestack ApiVersion
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listAppIds_MaximumSet_Gen.json
 */
async function globalRulestackListAppIdsMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listAppIds("praval", {
    appIdVersion: "8543",
    appPrefix: "pref",
    skip: "a6a321",
    top: 20,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to list of AppIds for GlobalRulestack ApiVersion
 *
 * @summary list of AppIds for GlobalRulestack ApiVersion
 * x-ms-original-file: 2025-10-08/GlobalRulestack_listAppIds_MinimumSet_Gen.json
 */
async function globalRulestackListAppIdsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.globalRulestack.listAppIds("praval");
  console.log(result);
}

async function main(): Promise<void> {
  await globalRulestackListAppIdsMaximumSetGen();
  await globalRulestackListAppIdsMinimumSetGen();
}

main().catch(console.error);
