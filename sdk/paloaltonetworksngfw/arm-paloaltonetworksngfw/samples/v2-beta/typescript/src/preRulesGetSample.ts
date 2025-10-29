// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PreRulesResource
 *
 * @summary get a PreRulesResource
 * x-ms-original-file: 2025-10-08/PreRules_Get_MaximumSet_Gen.json
 */
async function preRulesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.preRules.get("lrs1", "1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a PreRulesResource
 *
 * @summary get a PreRulesResource
 * x-ms-original-file: 2025-10-08/PreRules_Get_MinimumSet_Gen.json
 */
async function preRulesGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  const result = await client.preRules.get("lrs1", "1");
  console.log(result);
}

async function main(): Promise<void> {
  await preRulesGetMaximumSetGen();
  await preRulesGetMinimumSetGen();
}

main().catch(console.error);
