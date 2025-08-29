// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Agents in a Storage Mover.
 *
 * @summary lists all Agents in a Storage Mover.
 * x-ms-original-file: 2025-07-01/Agents_List_MaximumSet.json
 */
async function agentsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agents.list("examples-rg", "examples-storageMoverName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all Agents in a Storage Mover.
 *
 * @summary lists all Agents in a Storage Mover.
 * x-ms-original-file: 2025-07-01/Agents_List_MinimumSet.json
 */
async function agentsListMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agents.list("examples-rg", "examples-storageMoverName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await agentsListMaximumSet();
  await agentsListMinimumSet();
}

main().catch(console.error);
