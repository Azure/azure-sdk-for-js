// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 *
 * @summary create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 * x-ms-original-file: 2026-01-15-preview/CreateProject.json
 */
async function createProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projects.create("myResourceGroup", "testCreate1", "testProject1", {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: { description: "Description of this project", displayName: "p1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 *
 * @summary create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 * x-ms-original-file: 2026-01-15-preview/CreateProjectMin.json
 */
async function createProjectMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projects.create("myResourceGroup", "testCreate1", "testProject1", {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: {},
  });
  console.log(result);
}

async function main() {
  await createProject();
  await createProjectMin();
}

main().catch(console.error);
