// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update appliance of an ASR replication protected item.
 *
 * @summary the operation to update appliance of an ASR replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_UpdateAppliance.json
 */
async function updatesApplianceForReplicationProtectedItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.updateAppliance(
    "Ayan-0106-SA-RG",
    "Ayan-0106-SA-Vault",
    "Ayan-0106-SA-Vaultreplicationfabric",
    "Ayan-0106-SA-Vaultreplicationcontainer",
    "idclab-vcen67_50158124-8857-3e08-0893-2ddf8ebb8c1f",
    {
      properties: {
        providerSpecificDetails: { instanceType: "InMageRcm", runAsAccountId: "" },
        targetApplianceId: "",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesApplianceForReplicationProtectedItem();
}

main().catch(console.error);
