// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RecoveryPlanUnplannedFailoverInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to start the unplanned failover of a recovery plan.
 *
 * @summary The operation to start the unplanned failover of a recovery plan.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationRecoveryPlans_UnplannedFailover.json
 */
async function executeUnplannedFailoverOfTheRecoveryPlan(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const recoveryPlanName = "RPtest1";
  const input: RecoveryPlanUnplannedFailoverInput = {
    properties: {
      failoverDirection: "PrimaryToRecovery",
      providerSpecificDetails: [{ instanceType: "HyperVReplicaAzure" }],
      sourceSiteOperations: "Required",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationRecoveryPlans.beginUnplannedFailoverAndWait(
      resourceGroupName,
      resourceName,
      recoveryPlanName,
      input,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await executeUnplannedFailoverOfTheRecoveryPlan();
}

main().catch(console.error);
