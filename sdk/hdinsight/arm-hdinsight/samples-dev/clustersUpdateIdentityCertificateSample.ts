// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates the cluster identity certificate.
 *
 * @summary Updates the cluster identity certificate.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/HDI_Clusters_UpdateClusterIdentityCertificate.json
 */

import type { UpdateClusterIdentityCertificateParameters } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateClusterIdentityCertificate(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const parameters: UpdateClusterIdentityCertificateParameters = {
    applicationId: "applicationId",
    certificate: "base64encodedcertificate",
    certificatePassword: "**********",
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpdateIdentityCertificateAndWait(
    resourceGroupName,
    clusterName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateClusterIdentityCertificate();
}

main().catch(console.error);
