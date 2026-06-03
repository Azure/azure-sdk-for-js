// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DynatraceSingleSignOnResource
 *
 * @summary get a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_Get_MaximumSet_Gen.json
 */
async function singleSignOnGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.singleSignOn.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

/**
 * This sample demonstrates how to get a DynatraceSingleSignOnResource
 *
 * @summary get a DynatraceSingleSignOnResource
 * x-ms-original-file: 2024-04-24/SingleSignOn_Get_MinimumSet_Gen.json
 */
async function singleSignOnGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.singleSignOn.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await singleSignOnGetMaximumSetGen();
  await singleSignOnGetMinimumSetGen();
}

main().catch(console.error);
