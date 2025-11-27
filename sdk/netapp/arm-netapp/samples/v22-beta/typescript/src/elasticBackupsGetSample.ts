// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified Elastic Backup under Elastic Backup Vault.
 *
 * @summary get the specified Elastic Backup under Elastic Backup Vault.
 * x-ms-original-file: 2025-09-01-preview/ElasticBackups_Get.json
 */
async function elasticBackupsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackups.get("myRG", "account1", "backupVault1", "backup1");
  console.log(result);
}

async function main(): Promise<void> {
  await elasticBackupsGet();
}

main().catch(console.error);
