// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a pipeline run by its run ID.
 *
 * @summary get a pipeline run by its run ID.
 * x-ms-original-file: 2018-06-01/PipelineRuns_Get.json
 */
async function pipelineRunsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.pipelineRuns.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "2f7fdb90-5df1-4b8e-ac2f-064cfa58202b",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await pipelineRunsGet();
}

main().catch(console.error);
