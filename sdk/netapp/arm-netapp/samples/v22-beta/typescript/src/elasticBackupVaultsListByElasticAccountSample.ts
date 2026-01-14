// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list and describe all Elastic Backup Vaults in the elastic account.
 *
 * @summary list and describe all Elastic Backup Vaults in the elastic account.
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupVaults_ListByElasticAccount.json
 */
async function elasticBackupVaultsListByElasticAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticBackupVaults.listByElasticAccount("myRG", "account1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticBackupVaultsListByElasticAccount();
}

main().catch(console.error);
