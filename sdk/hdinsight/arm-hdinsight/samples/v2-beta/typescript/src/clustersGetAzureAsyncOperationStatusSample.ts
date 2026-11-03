// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the the async operation status.
 *
 * @summary the the async operation status.
 * x-ms-original-file: 2025-01-15-preview/GetClusterCreatingAsyncOperationStatus.json
 */
async function getAsyncOperationStatusOfCreatingCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.getAzureAsyncOperationStatus(
    "rg1",
    "cluster1",
    "CF938302-6B4D-44A0-A6D2-C0D67E847AEC",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAsyncOperationStatusOfCreatingCluster();
}

main().catch(console.error);
