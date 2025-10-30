// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PostRulesResource
 *
 * @summary get a PostRulesResource
 * x-ms-original-file: 2025-10-08/PostRules_Get_MaximumSet_Gen.json
 */
async function postRulesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.postRules.get("lrs1", "1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a PostRulesResource
 *
 * @summary get a PostRulesResource
 * x-ms-original-file: 2025-10-08/PostRules_Get_MinimumSet_Gen.json
 */
async function postRulesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.postRules.get("lrs1", "1");
  console.log(result);
}

async function main(): Promise<void> {
  await postRulesGetMaximumSetGen();
  await postRulesGetMinimumSetGen();
}

main().catch(console.error);
