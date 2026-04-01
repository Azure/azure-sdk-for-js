// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a pipeline.
 *
 * @summary gets a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_Get.json
 */
async function pipelinesGet(): Promise<void> {
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

async function main(): Promise<void> {
  await pipelinesGet();
}

main().catch(console.error);
