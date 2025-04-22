// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Schedulers by resource group
 *
 * @summary list Schedulers by resource group
 * x-ms-original-file: 2025-04-01-preview/Schedulers_ListByResourceGroup.json
 */
async function schedulersListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schedulers.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await schedulersListByResourceGroup();
}

main().catch(console.error);
