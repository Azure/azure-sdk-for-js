// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to start the unplanned failover of a recovery plan.
 *
 * @summary the operation to start the unplanned failover of a recovery plan.
 * x-ms-original-file: 2025-08-01/ReplicationRecoveryPlans_UnplannedFailover.json
 */
async function executeUnplannedFailoverOfTheRecoveryPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationRecoveryPlans.unplannedFailover(
    "resourceGroupPS1",
    "vault1",
    "RPtest1",
    {
      properties: {
        failoverDirection: "PrimaryToRecovery",
        providerSpecificDetails: [{ instanceType: "HyperVReplicaAzure" }],
        sourceSiteOperations: "Required",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeUnplannedFailoverOfTheRecoveryPlan();
}

main().catch(console.error);
