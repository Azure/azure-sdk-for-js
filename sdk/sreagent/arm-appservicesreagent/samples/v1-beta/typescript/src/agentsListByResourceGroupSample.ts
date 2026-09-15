// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all the agents in a resource group
 *
 * @summary get all the agents in a resource group
 * x-ms-original-file: 2026-01-01/Agents_ListByResourceGroup.json
 */
async function agentsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agents.listByResourceGroup("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await agentsListByResourceGroup();
}

main().catch(console.error);
