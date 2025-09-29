// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the object replication policy associated with the specified storage account.
 *
 * @summary Deletes the object replication policy associated with the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountDeleteObjectReplicationPolicy.json
 */
async function storageAccountDeleteObjectReplicationPolicies(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const objectReplicationPolicyId = "{objectReplicationPolicy-Id}";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.objectReplicationPoliciesOperations.delete(
    resourceGroupName,
    accountName,
    objectReplicationPolicyId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountDeleteObjectReplicationPolicies();
}

main().catch(console.error);
