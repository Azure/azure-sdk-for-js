// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a HcpOpenShiftCluster
 *
 * @summary update a HcpOpenShiftCluster
 * x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Update_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.hcpOpenShiftClusters.update("rgopenapi", "hcpCluster-name", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D/resourceGroups/rgopenapi/providers/Microsoft.ManagedIdentity/userAssignedIdentities/serviceMI":
          {},
      },
    },
    tags: { key4965: "gadonynrfuc" },
  });
  console.log(result);
}

async function main() {
  await hcpOpenShiftClustersUpdate();
}

main().catch(console.error);
