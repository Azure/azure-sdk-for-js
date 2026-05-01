// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a self-hosted integration runtime node.
 *
 * @summary updates a self-hosted integration runtime node.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimeNodes_Update.json
 */
async function integrationRuntimeNodesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeNodes.update(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    "Node_1",
    { concurrentJobsLimit: 2 },
  );
  console.log(result);
}

async function main() {
  await integrationRuntimeNodesUpdate();
}

main().catch(console.error);
