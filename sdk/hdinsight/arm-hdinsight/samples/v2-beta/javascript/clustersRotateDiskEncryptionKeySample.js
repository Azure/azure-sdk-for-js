// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to rotate disk encryption key of the specified HDInsight cluster.
 *
 * @summary rotate disk encryption key of the specified HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/RotateLinuxHadoopClusterDiskEncryptionKey.json
 */
async function rotateDiskEncryptionKeyOfTheSpecifiedHDInsightCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.rotateDiskEncryptionKey("rg1", "cluster1", {
    keyName: "newkeyname",
    keyVersion: "newkeyversion",
    vaultUri: "https://newkeyvault.vault.azure.net/",
  });
}

async function main() {
  await rotateDiskEncryptionKeyOfTheSpecifiedHDInsightCluster();
}

main().catch(console.error);
