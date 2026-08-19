// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to request a temporary admin kubeconfig for the cluster
 *
 * @summary request a temporary admin kubeconfig for the cluster
 * x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_RequestAdminCredential_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersRequestAdminCredentialMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOpenShiftClusters.requestAdminCredential(
    "rgopenapi",
    "hcpCluster-name",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hcpOpenShiftClustersRequestAdminCredentialMaximumSet();
}

main().catch(console.error);
