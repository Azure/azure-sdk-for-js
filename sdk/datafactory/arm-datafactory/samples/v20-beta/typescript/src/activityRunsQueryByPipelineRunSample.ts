// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to query activity runs based on input filter conditions.
 *
 * @summary query activity runs based on input filter conditions.
 * x-ms-original-file: 2018-06-01/ActivityRuns_QueryByPipelineRun.json
 */
async function activityRunsQueryByPipelineRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.activityRuns.queryByPipelineRun(
    "exampleResourceGroup",
    "exampleFactoryName",
    "2f7fdb90-5df1-4b8e-ac2f-064cfa58202b",
    {
      lastUpdatedAfter: new Date("2018-06-16T00:36:44.3345758Z"),
      lastUpdatedBefore: new Date("2018-06-16T00:49:48.3686473Z"),
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await activityRunsQueryByPipelineRun();
}

main().catch(console.error);
