// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a backup policy belonging to a backup vault
 *
 * @summary Deletes a backup policy belonging to a backup vault
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/PolicyCRUD/DeleteBackupPolicy.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteBackupPolicy(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "000pikumar";
  const vaultName = "PrivatePreviewVault";
  const backupPolicyName = "OSSDBPolicy";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupPolicies.delete(
    resourceGroupName,
    vaultName,
    backupPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteBackupPolicy();
}

main().catch(console.error);
