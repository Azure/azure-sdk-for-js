// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to update appliance of an ASR replication protected item.
 *
 * @summary The operation to update appliance of an ASR replication protected item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectedItems_UpdateAppliance.json
 */

import {
  UpdateApplianceForReplicationProtectedItemInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updatesApplianceForReplicationProtectedItem(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "7c943c1b-5122-4097-90c8-861411bdd574";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "Ayan-0106-SA-RG";
  const resourceName = "Ayan-0106-SA-Vault";
  const fabricName = "Ayan-0106-SA-Vaultreplicationfabric";
  const protectionContainerName = "Ayan-0106-SA-Vaultreplicationcontainer";
  const replicatedProtectedItemName =
    "idclab-vcen67_50158124-8857-3e08-0893-2ddf8ebb8c1f";
  const applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput =
  {
    properties: {
      providerSpecificDetails: {
        instanceType: "InMageRcm",
        runAsAccountId: "",
      },
      targetApplianceId: "",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectedItems.beginUpdateApplianceAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicatedProtectedItemName,
      applianceUpdateInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesApplianceForReplicationProtectedItem();
}

main().catch(console.error);
