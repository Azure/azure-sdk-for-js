// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the cluster identity certificate.
 *
 * @summary updates the cluster identity certificate.
 * x-ms-original-file: 2025-01-15-preview/HDI_Clusters_UpdateClusterIdentityCertificate.json
 */
async function updateClusterIdentityCertificate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.updateIdentityCertificate("rg1", "cluster1", {
    applicationId: "applicationId",
    certificate: "base64encodedcertificate",
    certificatePassword: "**********",
  });
}

async function main() {
  await updateClusterIdentityCertificate();
}

main().catch(console.error);
