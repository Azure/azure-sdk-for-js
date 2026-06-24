// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a PostRulesResource
 *
 * @summary delete a PostRulesResource
 * x-ms-original-file: 2026-05-11-preview/PostRules_Delete_MaximumSet_Gen.json
 */
async function postRulesDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.postRules.delete("lrs1", "1");
}

/**
 * This sample demonstrates how to delete a PostRulesResource
 *
 * @summary delete a PostRulesResource
 * x-ms-original-file: 2026-05-11-preview/PostRules_Delete_MinimumSet_Gen.json
 */
async function postRulesDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.postRules.delete("lrs1", "1");
}

async function main(): Promise<void> {
  await postRulesDeleteMaximumSetGen();
  await postRulesDeleteMinimumSetGen();
}

main().catch(console.error);
