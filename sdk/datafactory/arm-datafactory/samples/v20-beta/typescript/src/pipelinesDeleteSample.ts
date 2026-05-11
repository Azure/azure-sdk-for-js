// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a pipeline.
 *
 * @summary deletes a pipeline.
 * x-ms-original-file: 2018-06-01/Pipelines_Delete.json
 */
async function pipelinesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.pipelines.delete("exampleResourceGroup", "exampleFactoryName", "examplePipeline");
}

async function main(): Promise<void> {
  await pipelinesDelete();
}

main().catch(console.error);
