// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a pipeline.
 *
 * @summary deletes a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_Delete.json
 */
async function pipelinesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.pipelines.delete("exampleResourceGroup", "exampleFactoryName", "examplePipeline");
}

async function main() {
  await pipelinesDelete();
}

main().catch(console.error);
