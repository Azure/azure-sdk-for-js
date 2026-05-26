// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the cluster identity certificate.
 *
 * @summary updates the cluster identity certificate.
 * x-ms-original-file: 2025-01-15-preview/HDI_Clusters_UpdateClusterIdentityCertificate.json
 */
async function updateClusterIdentityCertificate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateIdentityCertificate("rg1", "cluster1", {
    applicationId: "applicationId",
    certificate: "base64encodedcertificate",
    certificatePassword: "**********",
  });
}

async function main(): Promise<void> {
  await updateClusterIdentityCertificate();
}

main().catch(console.error);
