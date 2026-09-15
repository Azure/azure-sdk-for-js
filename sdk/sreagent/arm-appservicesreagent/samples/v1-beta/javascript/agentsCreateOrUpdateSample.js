// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Agent
 *
 * @summary creates or updates an Agent
 * x-ms-original-file: 2026-01-01/Agents_CreateOrUpdate.json
 */
async function agentsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agents.createOrUpdate("examplerg", "testAgent", {
    location: "East US",
    tags: { environment: "production", team: "platform" },
    identity: { type: "SystemAssigned" },
    properties: {
      agentSpaceId:
        "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.App/agentSpaces/testAgentSpace",
      knowledgeGraphConfiguration: {
        identity:
          "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testIdentity",
        managedResources: [
          "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.Storage/storageAccounts/teststorage",
        ],
      },
      actionConfiguration: {
        identity:
          "/subscriptions/8efdecc5-919e-44eb-b179-915dca89ebf9/resourceGroups/examplerg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/actionIdentity",
        mode: "Review",
        accessLevel: "High",
      },
      logConfiguration: {
        applicationInsightsConfiguration: {
          appId: "87654321-4321-4321-4321-210987654321",
          connectionString:
            "InstrumentationKey=87654321-4321-4321-4321-210987654321;IngestionEndpoint=https://eastus-0.in.applicationinsights.azure.com/",
        },
      },
      agentIdentity: { initialSponsorGroupId: "99999999-aaaa-bbbb-cccc-dddddddddddd" },
      defaultModel: { provider: "MicrosoftFoundry", name: "gpt-5" },
    },
  });
  console.log(result);
}

async function main() {
  await agentsCreateOrUpdate();
}

main().catch(console.error);
