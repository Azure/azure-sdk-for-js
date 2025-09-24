// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProvider } from "@azure/arm-hardwaresecuritymodules";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a Cloud HSM Cluster in the specified subscription.
 *
 * @summary create or Update a Cloud HSM Cluster in the specified subscription.
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_CreateOrUpdate_MaximumSet_Gen.json
 */
async function cloudHsmClusterCreateOrUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusters.createOrUpdate("rgcloudhsm", "chsm1", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity-1":
          {},
      },
    },
    location: "eastus2",
    properties: { publicNetworkAccess: "Disabled" },
    sku: { name: "Standard_B1", family: "B" },
    tags: { Dept: "hsm", Environment: "dogfood" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await cloudHsmClusterCreateOrUpdateMaximumSetGen();
}

main().catch(console.error);
