// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to remove(unregister) a registered vCenter server from the vault.
 *
 * @summary the operation to remove(unregister) a registered vCenter server from the vault.
 * x-ms-original-file: 2025-08-01/ReplicationvCenters_Delete.json
 */
async function removeVCenterOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "7c943c1b-5122-4097-90c8-861411bdd574";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationvCenters.delete("MadhaviVRG", "MadhaviVault", "MadhaviFabric", "esx-78");
}

async function main(): Promise<void> {
  await removeVCenterOperation();
}

main().catch(console.error);
