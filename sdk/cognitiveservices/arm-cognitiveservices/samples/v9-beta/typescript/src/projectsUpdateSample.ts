// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a Cognitive Services Project
 *
 * @summary updates a Cognitive Services Project
 * x-ms-original-file: 2026-01-15-preview/UpdateProjects.json
 */
async function updateProject(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projects.update("bvttest", "bingSearch", "projectName", {
    location: "global",
    properties: { description: "new description." },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateProject();
}

main().catch(console.error);
