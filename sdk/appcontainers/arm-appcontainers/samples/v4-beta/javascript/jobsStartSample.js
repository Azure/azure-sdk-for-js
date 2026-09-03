// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to start a Container Apps Job
 *
 * @summary start a Container Apps Job
 * x-ms-original-file: 2025-10-02-preview/Job_Start.json
 */
async function runAContainerAppsJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.start("rg", "testcontainerAppsJob0", {
    template: {
      containers: [
        {
          name: "testcontainerAppsJob0",
          image: "repo/testcontainerAppsJob0:v4",
          resources: { cpu: 0.2, memory: "100Mi" },
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
  });
  console.log(result);
}

async function main() {
  await runAContainerAppsJob();
}

main().catch(console.error);
