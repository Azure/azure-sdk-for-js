// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Enables the Azure Monitor on the HDInsight cluster.
 *
 * @summary Enables the Azure Monitor on the HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/EnableLinuxClusterAzureMonitor.json
 */

import type { AzureMonitorRequest } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function enableAzureMonitor(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const parameters: AzureMonitorRequest = {
    primaryKey: "**********",
    workspaceId: "a2090ead-8c9f-4fba-b70e-533e3e003163",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.extensions.beginEnableAzureMonitorAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enableAzureMonitor();
}

main().catch(console.error);
