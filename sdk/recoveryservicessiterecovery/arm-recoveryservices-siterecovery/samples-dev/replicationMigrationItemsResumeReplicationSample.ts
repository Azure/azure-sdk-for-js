// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to initiate resume replication of the item.
 *
 * @summary The operation to initiate resume replication of the item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationMigrationItems_ResumeReplication.json
 */

import {
  ResumeReplicationInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resumeReplication(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "cb53d0c3-bd59-4721-89bc-06916a9147ef";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourcegroup1";
  const resourceName = "migrationvault";
  const fabricName = "vmwarefabric1";
  const protectionContainerName = "vmwareContainer1";
  const migrationItemName = "virtualmachine1";
  const resumeReplicationInput: ResumeReplicationInput = {
    properties: {
      providerSpecificDetails: {
        deleteMigrationResources: "false",
        instanceType: "VMwareCbt",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationMigrationItems.beginResumeReplicationAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      migrationItemName,
      resumeReplicationInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await resumeReplication();
}

main().catch(console.error);
