// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a run of a pipeline.
 *
 * @summary creates a run of a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_CreateRun.json
 */
async function pipelinesCreateRun(): Promise<void> {
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

async function main(): Promise<void> {
  await pipelinesCreateRun();
}

main().catch(console.error);
