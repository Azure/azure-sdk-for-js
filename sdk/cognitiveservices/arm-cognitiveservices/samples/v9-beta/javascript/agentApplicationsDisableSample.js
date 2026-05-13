// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables an Agent Application.
 *
 * @summary disables an Agent Application.
 * x-ms-original-file: 2026-01-15-preview/AgentApplication/disable.json
 */
async function disableAgentApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.agentApplications.disable(
    "test-rg",
    "my-cognitive-services-account",
    "my-project",
    "agent-app-1",
  );
}

async function main() {
  await disableAgentApplication();
}

main().catch(console.error);
