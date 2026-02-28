// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to see [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates.
 *
 * @summary see [Certificate rotation](https://docs.microsoft.com/azure/aks/certificate-rotation) for more details about rotating managed cluster certificates.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersRotateClusterCertificates.json
 */
async function rotateClusterCertificates(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusters.rotateClusterCertificates("rg1", "clustername1");
}

async function main(): Promise<void> {
  await rotateClusterCertificates();
}

main().catch(console.error);
