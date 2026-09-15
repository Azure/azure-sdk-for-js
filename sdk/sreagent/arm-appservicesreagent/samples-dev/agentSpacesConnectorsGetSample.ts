// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of an Agent Space Connector
 *
 * @summary get the properties of an Agent Space Connector
 * x-ms-original-file: 2026-01-01/AgentSpacesConnectors_Get.json
 */
async function agentSpacesConnectorsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpacesConnectors.get(
    "examplerg",
    "testAgentSpace",
    "shared-sql-connector",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await agentSpacesConnectorsGet();
}

main().catch(console.error);
