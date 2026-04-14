// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a run of a pipeline.
 *
 * @summary creates a run of a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_CreateRun.json
 */
async function pipelinesCreateRun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.pipelines.createRun(
    "exampleResourceGroup",
    "exampleFactoryName",
    "examplePipeline",
    { parameters: { OutputBlobNameList: ["exampleoutput.csv"] } },
  );
  console.log(result);
}

async function main() {
  await pipelinesCreateRun();
}

main().catch(console.error);
