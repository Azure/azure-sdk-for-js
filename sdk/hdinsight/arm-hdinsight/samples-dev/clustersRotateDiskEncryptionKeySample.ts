// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClusterDiskEncryptionParameters } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Rotate disk encryption key of the specified HDInsight cluster.
 *
 * @summary Rotate disk encryption key of the specified HDInsight cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/RotateLinuxHadoopClusterDiskEncryptionKey.json
 */
async function rotateDiskEncryptionKeyOfTheSpecifiedHdInsightCluster(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const parameters: ClusterDiskEncryptionParameters = {
    keyName: "newkeyname",
    keyVersion: "newkeyversion",
    vaultUri: "https://newkeyvault.vault.azure.net/",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginRotateDiskEncryptionKeyAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await rotateDiskEncryptionKeyOfTheSpecifiedHdInsightCluster();
}

main().catch(console.error);
