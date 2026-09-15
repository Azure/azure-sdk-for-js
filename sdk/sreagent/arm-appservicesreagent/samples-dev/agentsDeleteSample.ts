// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an Agent
 *
 * @summary delete an Agent
 * x-ms-original-file: 2026-01-01/Agents_Delete.json
 */
async function agentsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  await client.agents.delete("examplerg", "testAgent");
}

async function main(): Promise<void> {
  await agentsDelete();
}

main().catch(console.error);
