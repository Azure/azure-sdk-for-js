// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to start an Agent
 *
 * @summary start an Agent
 * x-ms-original-file: 2026-01-01/Agents_Start.json
 */
async function agentsStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agents.start("examplerg", "testAgent");
  console.log(result);
}

async function main(): Promise<void> {
  await agentsStart();
}

main().catch(console.error);
