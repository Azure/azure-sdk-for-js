// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the specified Elastic Backup Vault in the Elastic NetApp account
 *
 * @summary create or update the specified Elastic Backup Vault in the Elastic NetApp account
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupVaults_Create.json
 */
async function elasticBackupVaultsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackupVaults.createOrUpdate(
    "myRG",
    "account1",
    "backupVault1",
    { location: "eastus" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticBackupVaultsCreateOrUpdate();
}

main().catch(console.error);
