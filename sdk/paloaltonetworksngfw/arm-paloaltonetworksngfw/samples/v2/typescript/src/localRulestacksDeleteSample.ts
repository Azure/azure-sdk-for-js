// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a LocalRulestackResource
 *
 * @summary delete a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_Delete_MaximumSet_Gen.json
 */
async function localRulestacksDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRulestacks.delete("rgopenapi", "lrs1");
}

/**
 * This sample demonstrates how to delete a LocalRulestackResource
 *
 * @summary delete a LocalRulestackResource
 * x-ms-original-file: 2025-10-08/LocalRulestacks_Delete_MinimumSet_Gen.json
 */
async function localRulestacksDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRulestacks.delete("rgopenapi", "lrs1");
}

async function main(): Promise<void> {
  await localRulestacksDeleteMaximumSetGen();
  await localRulestacksDeleteMinimumSetGen();
}

main().catch(console.error);
