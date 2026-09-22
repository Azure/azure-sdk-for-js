// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to configures the gateway settings on the specified cluster.
 *
 * @summary configures the gateway settings on the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/HDI_Clusters_UpdateGatewaySettings_Enable.json
 */
async function enableHttpConnectivity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateGatewaySettings("rg1", "cluster1", {
    isCredentialEnabled: true,
    password: "**********",
    userName: "hadoop",
  });
}

/**
 * This sample demonstrates how to configures the gateway settings on the specified cluster.
 *
 * @summary configures the gateway settings on the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/HDI_Clusters_UpdateGatewaySettings_EntraUser.json
 */
async function updateEntraUserInHDInsight(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateGatewaySettings("rg1", "cluster1", {
    isCredentialEnabled: false,
    restAuthEntraUsers: [
      {
        displayName: "displayName",
        objectId: "00000000-0000-0000-0000-000000000000",
        upn: "user@microsoft.com",
      },
    ],
  });
}

async function main(): Promise<void> {
  await enableHttpConnectivity();
  await updateEntraUserInHDInsight();
}

main().catch(console.error);
