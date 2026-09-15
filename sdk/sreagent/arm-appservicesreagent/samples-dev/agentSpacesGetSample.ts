// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of an Agent Space
 *
 * @summary get the properties of an Agent Space
 * x-ms-original-file: 2026-01-01/AgentSpaces_Get.json
 */
async function agentSpacesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpaces.get("examplerg", "testAgentSpace");
  console.log(result);
}

async function main(): Promise<void> {
  await agentSpacesGet();
}

main().catch(console.error);
