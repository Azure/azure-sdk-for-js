// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patches a Container Apps Job using JSON Merge Patch
 *
 * @summary patches a Container Apps Job using JSON Merge Patch
 * x-ms-original-file: 2025-10-02-preview/Job_Patch.json
 */
async function patchContainerAppsJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.update("rg", "testcontainerAppsJob0", {
    properties: {
      configuration: {
        manualTriggerConfig: { parallelism: 4, replicaCompletionCount: 1 },
        replicaRetryLimit: 10,
        replicaTimeout: 10,
        triggerType: "Manual",
      },
      template: {
        containers: [
          {
            name: "testcontainerAppsJob0",
            image: "repo/testcontainerAppsJob0:v1",
            probes: [
              {
                type: "Liveness",
                httpGet: {
                  path: "/health",
                  httpHeaders: [{ name: "Custom-Header", value: "Awesome" }],
                  port: 8080,
                },
                initialDelaySeconds: 3,
                periodSeconds: 3,
              },
            ],
          },
        ],
        initContainers: [
          {
            name: "testinitcontainerAppsJob0",
            args: ["-c", "while true; do echo hello; sleep 10;done"],
            command: ["/bin/sh"],
            image: "repo/testcontainerAppsJob0:v4",
            resources: { cpu: 0.2, memory: "100Mi" },
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchContainerAppsJob();
}

main().catch(console.error);
