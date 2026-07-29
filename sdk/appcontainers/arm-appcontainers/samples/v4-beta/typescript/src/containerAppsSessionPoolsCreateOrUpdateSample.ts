// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a session pool with the given properties.
 *
 * @summary create or update a session pool with the given properties.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_LifecycleOnContainerExit_CreateOrUpdate.json
 */
async function createOrUpdateSessionPoolWithLifecycleOnContainerExitTimed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.createOrUpdate("rg", "testsessionpool", {
    identity: { type: "SystemAssigned" },
    location: "East US",
    containerType: "CustomContainer",
    customContainerTemplate: {
      containers: [
        {
          name: "testinitcontainer",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainer:v4",
          resources: { cpu: 0.25, memory: "0.5Gi" },
        },
      ],
      ingress: { targetPort: 80 },
      registryCredentials: {
        identity:
          "/subscriptions/7a497526-bb8d-4816-9795-db1418a1f977/resourcegroups/test/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testSP",
        server: "test.azurecr.io",
      },
    },
    dynamicPoolConfiguration: {
      lifecycleConfiguration: { lifecycleType: "OnContainerExit", maxAlivePeriodInSeconds: 86400 },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    managedIdentitySettings: [{ identity: "system", lifecycle: "Main" }],
    poolManagementType: "Dynamic",
    scaleConfiguration: { maxConcurrentSessions: 500, readySessionInstances: 100 },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a session pool with the given properties.
 *
 * @summary create or update a session pool with the given properties.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_LifecycleTimed_CreateOrUpdate.json
 */
async function createOrUpdateSessionPoolWithLifecycleTypeTimed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.createOrUpdate("rg", "testsessionpool", {
    identity: { type: "SystemAssigned" },
    location: "East US",
    containerType: "CustomContainer",
    customContainerTemplate: {
      containers: [
        {
          name: "testinitcontainer",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainer:v4",
          resources: { cpu: 0.25, memory: "0.5Gi" },
        },
      ],
      ingress: { targetPort: 80 },
      registryCredentials: {
        identity:
          "/subscriptions/7a497526-bb8d-4816-9795-db1418a1f977/resourcegroups/test/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testSP",
        server: "test.azurecr.io",
      },
    },
    dynamicPoolConfiguration: {
      lifecycleConfiguration: { cooldownPeriodInSeconds: 600, lifecycleType: "Timed" },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    managedIdentitySettings: [{ identity: "system", lifecycle: "Main" }],
    poolManagementType: "Dynamic",
    scaleConfiguration: { maxConcurrentSessions: 500, readySessionInstances: 100 },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a session pool with the given properties.
 *
 * @summary create or update a session pool with the given properties.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_McpServer_CreateOrUpdate.json
 */
async function createOrUpdateSessionPoolWithMCPServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.createOrUpdate("rg", "testsessionpool", {
    location: "East US",
    containerType: "Shell",
    dynamicPoolConfiguration: {
      lifecycleConfiguration: { cooldownPeriodInSeconds: 600, lifecycleType: "Timed" },
    },
    mcpServerSettings: { isMcpServerApiKeyDisabled: false, isMcpServerEnabled: true },
    poolManagementType: "Dynamic",
    scaleConfiguration: { maxConcurrentSessions: 50 },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSessionPoolWithLifecycleOnContainerExitTimed();
  await createOrUpdateSessionPoolWithLifecycleTypeTimed();
  await createOrUpdateSessionPoolWithMCPServer();
}

main().catch(console.error);
