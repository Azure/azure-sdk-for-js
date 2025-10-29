// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revert rulestack configuration
 *
 * @summary revert rulestack configuration
 * x-ms-original-file: 2025-10-08/LocalRulestacks_revert_MaximumSet_Gen.json
 */
async function localRulestacksRevertMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRulestacks.revert("rgopenapi", "lrs1");
}

/**
 * This sample demonstrates how to revert rulestack configuration
 *
 * @summary revert rulestack configuration
 * x-ms-original-file: 2025-10-08/LocalRulestacks_revert_MinimumSet_Gen.json
 */
async function localRulestacksRevertMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRulestacks.revert("rgopenapi", "lrs1");
}

async function main(): Promise<void> {
  await localRulestacksRevertMaximumSetGen();
  await localRulestacksRevertMinimumSetGen();
}

main().catch(console.error);
