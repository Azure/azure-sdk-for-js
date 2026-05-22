// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update container.
 *
 * @summary create or update container.
 * x-ms-original-file: 2025-12-01/Workspace/EnvironmentContainer/createOrUpdate.json
 */
async function createOrUpdateWorkspaceEnvironmentContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.environmentContainers.createOrUpdate(
    "testrg123",
    "testworkspace",
    "testEnvironment",
    {
      properties: {
        description: "string",
        properties: {
          additionalProp1: "string",
          additionalProp2: "string",
          additionalProp3: "string",
        },
        tags: { additionalProp1: "string", additionalProp2: "string", additionalProp3: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceEnvironmentContainer();
}

main().catch(console.error);
