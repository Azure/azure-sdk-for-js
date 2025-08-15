// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SessionPoolUpdatableProperties,
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches a session pool using JSON merge patch
 *
 * @summary Patches a session pool using JSON merge patch
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/stable/2025-01-01/examples/SessionPools_Patch.json
 */
async function updateSessionPool(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPCONTAINERS_RESOURCE_GROUP"] || "rg";
  const sessionPoolName = "testsessionpool";
  const sessionPoolEnvelope: SessionPoolUpdatableProperties = {
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
    },
    scaleConfiguration: {
      maxConcurrentSessions: 500,
      readySessionInstances: 100,
    },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.beginUpdateAndWait(
    resourceGroupName,
    sessionPoolName,
    sessionPoolEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateSessionPool();
}

main().catch(console.error);
