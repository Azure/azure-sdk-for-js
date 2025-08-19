// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or Update a Container Apps Job.
 *
 * @summary Create or Update a Container Apps Job.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Job_CreateorUpdate.json
 */

import { Job, ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateContainerAppsJob(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const jobName = "testcontainerappsjob0";
  const jobEnvelope: Job = {
    configuration: {
      identitySettings: [
        {
          identity:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
          lifecycle: "All",
        },
        { identity: "system", lifecycle: "Init" },
      ],
      manualTriggerConfig: { parallelism: 4, replicaCompletionCount: 1 },
      replicaRetryLimit: 10,
      replicaTimeout: 10,
      triggerType: "Manual",
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/34adfa4fCedf4dc0Ba29B6d1a69ab345/resourcegroups/rg/providers/MicrosoftManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
    location: "East US",
    template: {
      containers: [
        {
          name: "testcontainerappsjob0",
          image: "repo/testcontainerappsjob0:v1",
          probes: [
            {
              type: "Liveness",
              httpGet: {
                path: "/health",
                httpHeaders: [{ name: "Custom-Header", value: "Awesome" }],
                port: 8080,
              },
              initialDelaySeconds: 5,
              periodSeconds: 3,
            },
          ],
          volumeMounts: [
            {
              mountPath: "/mnt/path1",
              subPath: "subPath1",
              volumeName: "azurefile",
            },
            {
              mountPath: "/mnt/path2",
              subPath: "subPath2",
              volumeName: "nfsazurefile",
            },
          ],
        },
      ],
      initContainers: [
        {
          name: "testinitcontainerAppsJob0",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainerappsjob0:v4",
          resources: { cpu: 0.5, memory: "1Gi" },
        },
      ],
      volumes: [
        { name: "azurefile", storageName: "storage", storageType: "AzureFile" },
        {
          name: "nfsazurefile",
          storageName: "nfsStorage",
          storageType: "NfsAzureFile",
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.beginCreateOrUpdateAndWait(
    resourceGroupName,
    jobName,
    jobEnvelope,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update a Container Apps Job.
 *
 * @summary Create or Update a Container Apps Job.
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/Job_CreateorUpdate_EventTrigger.json
 */
async function createOrUpdateContainerAppsJobWithEventDrivenTrigger(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const jobName = "testcontainerappsjob0";
  const jobEnvelope: Job = {
    configuration: {
      eventTriggerConfig: {
        parallelism: 4,
        replicaCompletionCount: 1,
        scale: {
          maxExecutions: 5,
          minExecutions: 1,
          pollingInterval: 40,
          rules: [
            {
              name: "servicebuscalingrule",
              type: "azure-servicebus",
              identity:
                "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourcegroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
              metadata: { topicName: "my-topic" },
            },
          ],
        },
      },
      replicaRetryLimit: 10,
      replicaTimeout: 10,
      triggerType: "Event",
    },
    environmentId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/rg/providers/Microsoft.App/managedEnvironments/demokube",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/34adfa4fCedf4dc0Ba29B6d1a69ab345/resourcegroups/rg/providers/MicrosoftManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
    location: "East US",
    template: {
      containers: [
        {
          name: "testcontainerappsjob0",
          image: "repo/testcontainerappsjob0:v1",
        },
      ],
      initContainers: [
        {
          name: "testinitcontainerAppsJob0",
          args: ["-c", "while true; do echo hello; sleep 10;done"],
          command: ["/bin/sh"],
          image: "repo/testcontainerappsjob0:v4",
          resources: { cpu: 0.5, memory: "1Gi" },
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.beginCreateOrUpdateAndWait(
    resourceGroupName,
    jobName,
    jobEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateContainerAppsJob();
  await createOrUpdateContainerAppsJobWithEventDrivenTrigger();
}

main().catch(console.error);
