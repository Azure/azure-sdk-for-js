// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a FileSystemResource
 *
 * @summary update a FileSystemResource
 * x-ms-original-file: 2025-03-21-preview/FileSystems_Update_MaximumSet_Gen.json
 */

import { StorageClient } from "@azure/arm-dell-storage";
import { DefaultAzureCredential } from "@azure/identity";

async function fileSystemsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4B6E265D-57CF-4A9D-8B35-3CC68ED9D208";
  const client = new StorageClient(credential, subscriptionId);
  const result = await client.fileSystems.update("rgDell", "abcd", {
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: { key7645: {} },
    },
    tags: { key6099: "ursbxlphfcguvntuevleacwq" },
    properties: {
      delegatedSubnetId: "bfpuabdz",
      capacity: { current: "5" },
      encryption: {
        encryptionType: "Customer-managed keys (CMK)",
        keyUrl: "https://contoso.com/keyurl/keyVersion",
        encryptionIdentityProperties: {
          identityType: "UserAssigned",
          identityResourceId:
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a FileSystemResource
 *
 * @summary update a FileSystemResource
 * x-ms-original-file: 2025-03-21-preview/FileSystems_Update_MinimumSet_Gen.json
 */
async function fileSystemsUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "BF7E7352-2FE4-4163-9CF7-5FF8EC2E9B92";
  const client = new StorageClient(credential, subscriptionId);
  const result = await client.fileSystems.update("rgDell", "abcd", {
    properties: {
      delegatedSubnetId: "uqfvajvyltgmqvdnxhbrfqbpuey",
      capacity: { current: "5" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fileSystemsUpdateMaximumSetGen();
  await fileSystemsUpdateMinimumSetGen();
}

main().catch(console.error);
