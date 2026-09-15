// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Agent Space
 *
 * @summary creates or updates an Agent Space
 * x-ms-original-file: 2026-01-01/AgentSpaces_CreateOrUpdate.json
 */
async function agentSpacesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const result = await client.agentSpaces.createOrUpdate("examplerg", "newAgentSpace", {
    location: "East US",
    tags: { environment: "production", team: "platform", project: "aiAssistant" },
    identity: { type: "SystemAssigned" },
    properties: {
      description: "New production agent space for AI assistant services",
      maxAgentCount: 15,
      serviceTreeId: "abcdef12-3456-7890-abcd-ef1234567890",
      policies: {
        genevaActionsConfiguration: {
          acisEndpoint: "https://acis.eastus.monitoring.azure.com",
          clientId: "12345678-1234-1234-1234-123456789012",
          certificateSubjectName: "CN=AgentSpaceAuth",
          authenticationMode: "OAuth",
          extensionName: "GenevaActions",
          allowedActions: [
            {
              actionName: "RestartService",
              extension: "GenevaActions",
              actionParameters: [{ name: "serviceName", type: "string" }],
              approvalRequired: true,
            },
            {
              actionName: "GetMetrics",
              extension: "GenevaActions",
              actionParameters: [
                { name: "metricName", type: "string" },
                { name: "timeRange", type: "string" },
              ],
              approvalRequired: false,
            },
          ],
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await agentSpacesCreateOrUpdate();
}

main().catch(console.error);
