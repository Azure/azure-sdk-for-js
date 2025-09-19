// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Project,
  CognitiveServicesManagementClient,
} from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Cognitive Services Project
 *
 * @summary Updates a Cognitive Services Project
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/UpdateProjects.json
 */
async function updateProject(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "bvttest";
  const accountName = "bingSearch";
  const projectName = "projectName";
  const project: Project = {
    location: "global",
    properties: { description: "new description." },
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.projects.beginUpdateAndWait(
    resourceGroupName,
    accountName,
    projectName,
    project,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateProject();
}

main().catch(console.error);
