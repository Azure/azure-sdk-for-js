// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create an ASR replication protection intent item.
 *
 * @summary the operation to create an ASR replication protection intent item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionIntents_Create.json
 */
async function createProtectionIntentResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "509099b2-9d2c-4636-b43e-bd5cafb6be69";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionIntents.create(
    "resourceGroupPS1",
    "vault1",
    "vm1",
    {
      properties: {
        providerSpecificDetails: {
          fabricObjectId:
            "/subscriptions/509099b2-9d2c-4636-b43e-bd5cafb6be69/resourceGroups/removeOne/providers/Microsoft.Compute/virtualMachines/vmPpgAv5",
          instanceType: "A2A",
          primaryLocation: "eastUs2",
          recoveryAvailabilityType: "Single",
          recoveryLocation: "westus2",
          recoveryResourceGroupId:
            "/subscriptions/509099b2-9d2c-4636-b43e-bd5cafb6be69/resourceGroups/removeOne-asr",
          recoverySubscriptionId: "ed5bcdf6-d61e-47bd-8ea9-f2bd379a2640",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createProtectionIntentResource();
}

main().catch(console.error);
