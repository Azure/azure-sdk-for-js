// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update container.
 *
 * @summary create or update container.
 * x-ms-original-file: 2025-12-01/Workspace/DataContainer/createOrUpdate.json
 */
async function createOrUpdateWorkspaceDataContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.dataContainers.createOrUpdate(
    "testrg123",
    "workspace123",
    "datacontainer123",
    {
      properties: {
        description: "string",
        dataType: "UriFile",
        properties: { properties1: "value1", properties2: "value2" },
        tags: { tag1: "value1", tag2: "value2" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceDataContainer();
}

main().catch(console.error);
