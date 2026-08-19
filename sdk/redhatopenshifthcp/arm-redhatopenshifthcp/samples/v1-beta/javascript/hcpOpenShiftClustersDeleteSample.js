// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a HcpOpenShiftCluster
 *
 * @summary delete a HcpOpenShiftCluster
 * x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Delete_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  await client.hcpOpenShiftClusters.delete("rgopenapi", "hcpCluster-name");
}

async function main() {
  await hcpOpenShiftClustersDelete();
}

main().catch(console.error);
