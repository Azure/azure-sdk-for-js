// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete or remove a protection container mapping.
 *
 * @summary the operation to delete or remove a protection container mapping.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionContainerMappings_Delete.json
 */
async function removeProtectionContainerMapping(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationProtectionContainerMappings.delete(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "cloud1protectionprofile1",
    { properties: { providerSpecificInput: {} } },
  );
}

async function main(): Promise<void> {
  await removeProtectionContainerMapping();
}

main().catch(console.error);
