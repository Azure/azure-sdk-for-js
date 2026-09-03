// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitoragents";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates part of an observability agent.
 *
 * @summary updates part of an observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_Update.json
 */
async function observabilityAgentsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.observabilityAgents.update(
    "myResourceGroup",
    "myObservabilityAgent",
    {
      tags: { env: "prod" },
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
        enabled: false,
        operations: [
          {
            type: "IssueCreation",
            mode: "Manual",
            instructions: "Focus on storage and networking issues only.",
          },
          { type: "Investigation", mode: "Auto", instructions: "Focus on recent network issues." },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates part of an observability agent.
 *
 * @summary updates part of an observability agent.
 * x-ms-original-file: 2026-05-01-preview/ObservabilityAgents_Update_MinimumSet.json
 */
async function observabilityAgentsUpdateMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.observabilityAgents.update(
    "myResourceGroup",
    "myObservabilityAgent",
    {
      properties: {
        monitoringAccountId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Monitor/accounts/myAzureMonitorWorkspace",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await observabilityAgentsUpdate();
  await observabilityAgentsUpdateMinimumSet();
}

main().catch(console.error);
