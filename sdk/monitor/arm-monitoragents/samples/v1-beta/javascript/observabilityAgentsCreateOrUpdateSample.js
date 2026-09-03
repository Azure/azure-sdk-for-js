// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitoragents");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an observability agent.
 *
 * @summary creates or updates an observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_CreateOrUpdate.json
 */
async function observabilityAgentsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.observabilityAgents.createOrUpdate(
    "myResourceGroup",
    "myObservabilityAgent",
    {
      location: "eastus",
      tags: { env: "dev" },
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity":
            {},
        },
      },
      properties: {
        monitoringAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Monitor/accounts/myAzureMonitorWorkspace",
        enabled: true,
        operations: [
          { type: "IssueCreation", mode: "Auto", instructions: "use includeAlertsFromGlobalRules" },
          { type: "Investigation", mode: "Auto", instructions: "focus on recent issues" },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an observability agent.
 *
 * @summary creates or updates an observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_CreateOrUpdate_MinimumSet.json
 */
async function observabilityAgentsCreateOrUpdateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.observabilityAgents.createOrUpdate(
    "myResourceGroup",
    "myObservabilityAgent",
    {
      location: "eastus",
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity":
            {},
        },
      },
      properties: {
        monitoringAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Monitor/accounts/myAzureMonitorWorkspace",
      },
    },
  );
  console.log(result);
}

async function main() {
  await observabilityAgentsCreateOrUpdate();
  await observabilityAgentsCreateOrUpdateMinimumSet();
}

main().catch(console.error);
