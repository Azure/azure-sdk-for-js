// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the async operation status of execution operation.
 *
 * @summary gets the async operation status of execution operation.
 * x-ms-original-file: 2025-01-15-preview/GetScriptExecutionAsyncOperationStatus.json
 */
async function getsTheAsyncExecutionOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.scriptActions.getExecutionAsyncOperationStatus(
    "rg1",
    "cluster1",
    "CF938302-6B4D-44A0-A6D2-C0D67E847AEC",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheAsyncExecutionOperationStatus();
}

main().catch(console.error);
