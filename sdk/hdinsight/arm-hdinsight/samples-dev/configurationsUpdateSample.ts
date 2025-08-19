// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 *
 * @summary Configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/ChangeHttpConnectivityDisable.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function disableHttpConnectivity(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const configurationName = "gateway";
  const parameters: { [propertyName: string]: string } = {
    restAuthCredentialIsEnabled: "false",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.configurations.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    configurationName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 *
 * @summary Configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/ChangeHttpConnectivityEnable.json
 */
async function enableHttpConnectivity(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const configurationName = "gateway";
  const parameters: { [propertyName: string]: string } = {
    restAuthCredentialIsEnabled: "true",
    restAuthCredentialPassword: "**********",
    restAuthCredentialUsername: "hadoop",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.configurations.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    configurationName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableHttpConnectivity();
  await enableHttpConnectivity();
}

main().catch(console.error);
