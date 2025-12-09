// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified Elastic Backup Vault
 *
 * @summary delete the specified Elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupVaults_Delete.json
 */
async function elasticBackupVaultsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticBackupVaults.delete("resourceGroup", "account1", "backupVault1");
}

async function main(): Promise<void> {
  await elasticBackupVaultsDelete();
}

main().catch(console.error);
