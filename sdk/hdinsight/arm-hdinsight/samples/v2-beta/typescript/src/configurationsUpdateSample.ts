// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 *
 * @summary configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 * x-ms-original-file: 2025-01-15-preview/ChangeHttpConnectivityDisable.json
 */
async function disableHttpConnectivity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.configurations.update("rg1", "cluster1", "gateway", {
    "restAuthCredential.isEnabled": "false",
  });
}

/**
 * This sample demonstrates how to configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 *
 * @summary configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 * x-ms-original-file: 2025-01-15-preview/ChangeHttpConnectivityEnable.json
 */
async function enableHttpConnectivity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.configurations.update("rg1", "cluster1", "gateway", {
    "restAuthCredential.isEnabled": "true",
    "restAuthCredential.password": "**********",
    "restAuthCredential.username": "hadoop",
  });
}

async function main(): Promise<void> {
  await disableHttpConnectivity();
  await enableHttpConnectivity();
}

main().catch(console.error);
