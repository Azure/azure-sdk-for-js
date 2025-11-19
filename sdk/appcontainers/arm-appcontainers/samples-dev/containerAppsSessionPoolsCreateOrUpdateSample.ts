// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SessionPool} from "@azure/arm-appcontainers";
import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update a session pool with the given properties.
 *
 * @summary Create or update a session pool with the given properties.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/SessionPools_LifecycleOnContainerExit_CreateOrUpdate.json
 */
async function createOrUpdateSessionPoolWithLifecycleOnContainerExitTimed(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const sessionPoolName = "testsessionpool";
  const sessionPoolEnvelope: SessionPool = {
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
      lifecycleConfiguration: {
        lifecycleType: "OnContainerExit",
        maxAlivePeriodInSeconds: 86400,
      },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    identity: { type: "SystemAssigned" },
    location: "East US",
    managedIdentitySettings: [{ identity: "system", lifecycle: "Main" }],
    poolManagementType: "Dynamic",
    scaleConfiguration: {
      maxConcurrentSessions: 500,
      readySessionInstances: 100,
    },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result =
    await client.containerAppsSessionPools.beginCreateOrUpdateAndWait(
      resourceGroupName,
      sessionPoolName,
      sessionPoolEnvelope,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or update a session pool with the given properties.
 *
 * @summary Create or update a session pool with the given properties.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/SessionPools_LifecycleTimed_CreateOrUpdate.json
 */
async function createOrUpdateSessionPoolWithLifecycleTypeTimed(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const sessionPoolName = "testsessionpool";
  const sessionPoolEnvelope: SessionPool = {
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
      lifecycleConfiguration: {
        lifecycleType: "OnContainerExit",
        maxAlivePeriodInSeconds: 86400,
      },
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    identity: { type: "SystemAssigned" },
    location: "East US",
    managedIdentitySettings: [{ identity: "system", lifecycle: "Main" }],
    poolManagementType: "Dynamic",
    scaleConfiguration: {
      maxConcurrentSessions: 500,
      readySessionInstances: 100,
    },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result =
    await client.containerAppsSessionPools.beginCreateOrUpdateAndWait(
      resourceGroupName,
      sessionPoolName,
      sessionPoolEnvelope,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateSessionPoolWithLifecycleOnContainerExitTimed();
  await createOrUpdateSessionPoolWithLifecycleTypeTimed();
}

main().catch(console.error);
