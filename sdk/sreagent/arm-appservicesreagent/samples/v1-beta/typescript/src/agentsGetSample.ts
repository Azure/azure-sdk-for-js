// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of an Agent
 *
 * @summary get the properties of an Agent
 * x-ms-original-file: 2026-01-01/Agents_Get.json
 */
async function agentsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agents.get("examplerg", "testAgent");
  console.log(result);
}

async function main(): Promise<void> {
  await agentsGet();
}

main().catch(console.error);
