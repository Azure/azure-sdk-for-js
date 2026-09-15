// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of an Agent Connector
 *
 * @summary get the properties of an Agent Connector
 * x-ms-original-file: 2026-01-01/AgentsConnectors_Get.json
 */
async function agentsConnectorsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentsConnectors.get("examplerg", "testAgent", "kusto-connector");
  console.log(result);
}

async function main(): Promise<void> {
  await agentsConnectorsGet();
}

main().catch(console.error);
