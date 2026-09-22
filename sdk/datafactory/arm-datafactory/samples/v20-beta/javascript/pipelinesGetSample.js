// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a pipeline.
 *
 * @summary gets a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_Get.json
 */
async function pipelinesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.pipelines.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "examplePipeline",
  );
  console.log(result);
}

async function main() {
  await pipelinesGet();
}

main().catch(console.error);
