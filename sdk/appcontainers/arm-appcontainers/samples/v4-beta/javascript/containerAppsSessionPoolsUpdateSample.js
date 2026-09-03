// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patches a session pool using JSON merge patch
 *
 * @summary patches a session pool using JSON merge patch
 * x-ms-original-file: 2025-10-02-preview/SessionPools_Patch.json
 */
async function updateSessionPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.update("rg", "testsessionpool", {
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
    dynamicPoolConfiguration: {
      lifecycleConfiguration: { cooldownPeriodInSeconds: 600, lifecycleType: "Timed" },
    },
    scaleConfiguration: { maxConcurrentSessions: 500, readySessionInstances: 100 },
    sessionNetworkConfiguration: { status: "EgressEnabled" },
  });
  console.log(result);
}

async function main() {
  await updateSessionPool();
}

main().catch(console.error);
