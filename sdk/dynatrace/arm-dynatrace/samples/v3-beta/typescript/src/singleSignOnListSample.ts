// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all DynatraceSingleSignOnResource by monitorName
 *
 * @summary list all DynatraceSingleSignOnResource by monitorName
 * x-ms-original-file: 2024-04-24/SingleSignOn_List_MaximumSet_Gen.json
 */
async function singleSignOnListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.singleSignOn.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all DynatraceSingleSignOnResource by monitorName
 *
 * @summary list all DynatraceSingleSignOnResource by monitorName
 * x-ms-original-file: 2024-04-24/SingleSignOn_List_MinimumSet_Gen.json
 */
async function singleSignOnListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.singleSignOn.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await singleSignOnListMaximumSetGen();
  await singleSignOnListMinimumSetGen();
}

main().catch(console.error);
