// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Agent Applications in the project.
 *
 * @summary lists Agent Applications in the project.
 * x-ms-original-file: 2026-01-15-preview/AgentApplication/list.json
 */
async function listAccountAgentApplications(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentApplications.list(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    {
      count: 30,
      skipToken: "string",
      names: ["agent-app-1", "agent-app-2"],
      searchText: "test",
      orderBy: "name",
      orderByAsc: true,
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAccountAgentApplications();
}

main().catch(console.error);
