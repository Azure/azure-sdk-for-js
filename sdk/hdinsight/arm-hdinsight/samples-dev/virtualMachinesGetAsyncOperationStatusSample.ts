// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the async operation status.
 *
 * @summary Gets the async operation status.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetRestartHostsAsyncOperationStatus.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsTheAsyncOperationStatusOfRestartingHost(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const operationId = "CF938302-6B4D-44A0-A6D2-C0D67E847AEC";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.getAsyncOperationStatus(
    resourceGroupName,
    clusterName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheAsyncOperationStatusOfRestartingHost();
}

main().catch(console.error);
