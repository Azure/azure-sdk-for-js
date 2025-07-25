// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Cloud HSM Cluster in the specified subscription.
 *
 * @summary update a Cloud HSM Cluster in the specified subscription.
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_Update_MaximumSet_Gen.json
 */
async function cloudHsmClusterUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusters.update("rgcloudhsm", "chsm1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-1":
          {},
      },
    },
    tags: { Dept: "hsm", Environment: "dogfood", Slice: "A" },
  });
  console.log(result);
}

async function main() {
  await cloudHsmClusterUpdateMaximumSetGen();
}

main().catch(console.error);
