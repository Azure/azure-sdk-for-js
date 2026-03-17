// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to start the test failover of a recovery plan.
 *
 * @summary the operation to start the test failover of a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_TestFailover.json
 */
async function executeTestFailoverOfTheRecoveryPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.testFailover(
    "resourceGroupPS1",
    "vault1",
    "RPtest1",
    {
      properties: {
        failoverDirection: "PrimaryToRecovery",
        networkId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/siterecoveryProd1/providers/Microsoft.Network/virtualNetworks/vnetavrai",
        networkType: "VmNetworkAsInput",
        providerSpecificDetails: [{ instanceType: "HyperVReplicaAzure" }],
      },
    },
  );
  console.log(result);
}

async function main() {
  await executeTestFailoverOfTheRecoveryPlan();
}

main().catch(console.error);
