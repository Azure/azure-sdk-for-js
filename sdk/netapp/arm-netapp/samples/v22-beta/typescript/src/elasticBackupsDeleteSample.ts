// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ElasticBackup
 *
 * @summary delete a ElasticBackup
 * x-ms-original-file: 2025-09-01-preview/ElasticBackups_Delete.json
 */
async function elasticBackupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.elasticBackups.delete("resourceGroup", "account1", "backupVault1", "backup1");
}

async function main(): Promise<void> {
  await elasticBackupsDelete();
}

main().catch(console.error);
