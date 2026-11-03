// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 *
 * @summary configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 * x-ms-original-file: 2025-01-15-preview/ChangeHttpConnectivityDisable.json
 */
async function disableHttpConnectivity() {
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
async function enableHttpConnectivity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.configurations.update("rg1", "cluster1", "gateway", {
    "restAuthCredential.isEnabled": "true",
    "restAuthCredential.password": "**********",
    "restAuthCredential.username": "hadoop",
  });
}

async function main() {
  await disableHttpConnectivity();
  await enableHttpConnectivity();
}

main().catch(console.error);
