// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to see [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates.
 *
 * @summary see [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates.
 * x-ms-original-file: 2026-01-01/ManagedClustersRotateClusterCertificates.json
 */
async function rotateClusterCertificates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusters.rotateClusterCertificates("rg1", "clustername1");
}

async function main() {
  await rotateClusterCertificates();
}

main().catch(console.error);
