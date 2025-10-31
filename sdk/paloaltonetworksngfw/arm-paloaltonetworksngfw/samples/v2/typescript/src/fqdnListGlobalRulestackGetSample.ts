// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a FqdnListGlobalRulestackResource
 *
 * @summary get a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListGlobalRulestack_Get_MaximumSet_Gen.json
 */
async function fqdnListGlobalRulestackGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a FqdnListGlobalRulestackResource
 *
 * @summary get a FqdnListGlobalRulestackResource
 * x-ms-original-file: 2025-10-08/FqdnListGlobalRulestack_Get_MinimumSet_Gen.json
 */
async function fqdnListGlobalRulestackGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.fqdnListGlobalRulestack.get("praval", "armid1");
  console.log(result);
}

async function main(): Promise<void> {
  await fqdnListGlobalRulestackGetMaximumSetGen();
  await fqdnListGlobalRulestackGetMinimumSetGen();
}

main().catch(console.error);
