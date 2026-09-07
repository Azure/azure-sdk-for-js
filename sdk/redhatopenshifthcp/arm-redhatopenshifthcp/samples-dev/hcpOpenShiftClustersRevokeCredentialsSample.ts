// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revoke all credentials issued by requestAdminCredential
 *
 * @summary revoke all credentials issued by requestAdminCredential
 * x-ms-original-file: 2026-09-01-preview/HcpOpenShiftClusters_RevokeCredentials_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersRevokeCredentialsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  await client.hcpOpenShiftClusters.revokeCredentials("rgopenapi", "hcpCluster-name");
}

async function main(): Promise<void> {
  await hcpOpenShiftClustersRevokeCredentialsMaximumSet();
}

main().catch(console.error);
