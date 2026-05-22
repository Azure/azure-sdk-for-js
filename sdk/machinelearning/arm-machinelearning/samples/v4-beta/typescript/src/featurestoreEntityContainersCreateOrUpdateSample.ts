// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update container.
 *
 * @summary create or update container.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturestoreEntityContainer/createOrUpdate.json
 */
async function createOrUpdateWorkspaceFeaturestoreEntityContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.featurestoreEntityContainers.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    {
      properties: {
        description: "string",
        isArchived: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceFeaturestoreEntityContainer();
}

main().catch(console.error);
