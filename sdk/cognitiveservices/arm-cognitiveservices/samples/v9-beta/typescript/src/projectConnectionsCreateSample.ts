// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Cognitive Services project connection under the specified project.
 *
 * @summary create or update Cognitive Services project connection under the specified project.
 * x-ms-original-file: 2026-01-15-preview/ProjectConnection/create.json
 */
async function createProjectConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.projectConnections.create(
    "resourceGroup-1",
    "account-1",
    "project-1",
    "connection-1",
    {
      connection: {
        properties: {
          authType: "None",
          category: "ContainerRegistry",
          expiryTime: new Date("2024-03-15T14:30:00Z"),
          target: "[target url]",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createProjectConnection();
}

main().catch(console.error);
