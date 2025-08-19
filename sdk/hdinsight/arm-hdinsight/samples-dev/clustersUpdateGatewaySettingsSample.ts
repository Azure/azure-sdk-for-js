// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Configures the gateway settings on the specified cluster.
 *
 * @summary Configures the gateway settings on the specified cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/HDI_Clusters_UpdateGatewaySettings_Enable.json
 */

import type { UpdateGatewaySettingsParameters } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function enableHttpConnectivity(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const parameters: UpdateGatewaySettingsParameters = {
    isCredentialEnabled: true,
    password: "**********",
    userName: "hadoop",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpdateGatewaySettingsAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enableHttpConnectivity();
}

main().catch(console.error);
