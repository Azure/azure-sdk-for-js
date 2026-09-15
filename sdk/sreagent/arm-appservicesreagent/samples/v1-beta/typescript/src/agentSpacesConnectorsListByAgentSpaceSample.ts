// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppClient } from "@azure/arm-appservicesreagent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all the connectors for an Agent Space
 *
 * @summary get all the connectors for an Agent Space
 * x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListByAgentSpace.json
 */
async function agentSpacesConnectorsListByAgentSpace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentSpacesConnectors.listByAgentSpace(
    "examplerg",
    "testAgentSpace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await agentSpacesConnectorsListByAgentSpace();
}

main().catch(console.error);
