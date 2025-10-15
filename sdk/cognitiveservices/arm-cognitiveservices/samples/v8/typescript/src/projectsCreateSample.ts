// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Project,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 *
 * @summary Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CreateProject.json
 */
async function createProject(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "testCreate1";
  const projectName = "testProject1";
  const project: Project = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: {
      description: "Description of this project",
      displayName: "p1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projects.beginCreateAndWait(
    resourceGroupName,
    accountName,
    projectName,
    project,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 *
 * @summary Create Cognitive Services Account's Project. Project is a sub-resource of an account which give AI developer it's individual container to work on.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/CreateProjectMin.json
 */
async function createProjectMin(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "testCreate1";
  const projectName = "testProject1";
  const project: Project = {
    identity: { type: "SystemAssigned" },
    location: "West US",
    properties: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projects.beginCreateAndWait(
    resourceGroupName,
    accountName,
    projectName,
    project,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createProject();
  await createProjectMin();
}

main().catch(console.error);
