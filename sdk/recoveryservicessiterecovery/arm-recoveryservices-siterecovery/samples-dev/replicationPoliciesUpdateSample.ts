// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  UpdatePolicyInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to update a replication policy.
 *
 * @summary The operation to update a replication policy.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationPolicies_Update.json
 */
async function updatesThePolicy(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const policyName = "protectionprofile1";
  const input: UpdatePolicyInput = {
    properties: {
      replicationProviderSettings: { instanceType: "HyperVReplicaAzure" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationPolicies.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    policyName,
    input,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesThePolicy();
}

main().catch(console.error);
