// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update container.
 *
 * @summary create or update container.
 * x-ms-original-file: 2025-12-01/Workspace/ModelContainer/createOrUpdate.json
 */
async function createOrUpdateWorkspaceModelContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.modelContainers.createOrUpdate(
    "testrg123",
    "workspace123",
    "testContainer",
    {
      properties: {
        description: "Model container description",
        tags: { tag1: "value1", tag2: "value2" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateWorkspaceModelContainer();
}

main().catch(console.error);
