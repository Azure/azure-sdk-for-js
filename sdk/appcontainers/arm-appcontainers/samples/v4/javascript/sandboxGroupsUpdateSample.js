// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patches a SandboxGroup.
 *
 * @summary patches a SandboxGroup.
 * x-ms-original-file: 2026-07-01/SandboxGroups_Update.json
 */
async function updateASandboxGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.sandboxGroups.update("examplerg", "testgroup", {
    tags: { environment: "test" },
    properties: {
      environmentId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/examplerg/providers/Microsoft.App/managedEnvironments/exampleenv",
    },
  });
}

async function main() {
  await updateASandboxGroup();
}

main().catch(console.error);
