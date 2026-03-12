// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create a replication policy.
 *
 * @summary The operation to create a replication policy.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationPolicies_Create.json
 */

import {
  CreatePolicyInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createsThePolicy(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const policyName = "protectionprofile1";
  const input: CreatePolicyInput = {
    properties: {
      providerSpecificInput: { instanceType: "HyperVReplicaAzure" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationPolicies.beginCreateAndWait(
    resourceGroupName,
    resourceName,
    policyName,
    input,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsThePolicy();
}

main().catch(console.error);
