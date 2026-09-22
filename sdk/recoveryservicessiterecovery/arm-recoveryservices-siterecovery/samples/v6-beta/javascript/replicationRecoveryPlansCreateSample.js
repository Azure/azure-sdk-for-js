// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create a recovery plan.
 *
 * @summary the operation to create a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_Create.json
 */
async function createsARecoveryPlanWithTheGivenDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.create(
    "resourceGroupPS1",
    "vault1",
    "RPtest1",
    {
      properties: {
        failoverDeploymentModel: "ResourceManager",
        groups: [
          {
            endGroupActions: [],
            groupType: "Boot",
            replicationProtectedItems: [
              {
                id: "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud1/replicationProtectionContainers/cloud_6d224fc6-f326-5d35-96de-fbf51efb3179/replicationProtectedItems/f8491e4f-817a-40dd-a90c-af773978c75b",
                virtualMachineId: "f8491e4f-817a-40dd-a90c-af773978c75b",
              },
            ],
            startGroupActions: [],
          },
        ],
        primaryFabricId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud1",
        recoveryFabricId: "Microsoft Azure",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createsARecoveryPlanWithTheGivenDetails();
}

main().catch(console.error);
