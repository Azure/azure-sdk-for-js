// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Elastic Backup Vault
 *
 * @summary get the Elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupVaults_Get.json
 */
async function elasticBackupVaultsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupVaults.get("myRG", "account1", "backupVault1");
  console.log(result);
}

async function main(): Promise<void> {
  await elasticBackupVaultsGet();
}

main().catch(console.error);
