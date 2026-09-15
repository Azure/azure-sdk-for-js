// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Agent Space's properties
 *
 * @summary update Agent Space's properties
 * x-ms-original-file: 2026-01-01/AgentSpaces_Update.json
 */
async function agentSpacesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpaces.update("examplerg", "testAgentSpace", {
    tags: { environment: "staging", version: "v2.0" },
    properties: { maxAgentCount: 20 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await agentSpacesUpdate();
}

main().catch(console.error);
