// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the storage classification mappings in the vault.
 *
 * @summary lists the storage classification mappings in the vault.
 * x-ms-original-file: 2025-08-01/ReplicationStorageClassificationMappings_List.json
 */
async function getsTheListOfStorageClassificationMappingsObjectsUnderAVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9112a37f-0f3e-46ec-9c00-060c6edca071";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationStorageClassificationMappings.list(
    "resourceGroupPS1",
    "vault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfStorageClassificationMappingsObjectsUnderAVault();
}

main().catch(console.error);
