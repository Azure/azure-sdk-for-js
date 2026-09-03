// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to disable replication on a replication protected item. This will also remove the item.
 *
 * @summary the operation to disable replication on a replication protected item. This will also remove the item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_Delete.json
 */
async function disablesProtection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationProtectedItems.delete(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "c0c14913-3d7a-48ea-9531-cc99e0e686e6",
    {
      properties: {
        replicationProviderInput: { instanceType: "DisableProtectionProviderSpecificInput" },
      },
    },
  );
}

async function main(): Promise<void> {
  await disablesProtection();
}

main().catch(console.error);
