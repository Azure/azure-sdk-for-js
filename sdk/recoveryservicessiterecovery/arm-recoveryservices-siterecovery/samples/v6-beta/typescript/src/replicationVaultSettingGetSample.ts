// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the vault setting. This includes the Migration Hub connection settings.
 *
 * @summary gets the vault setting. This includes the Migration Hub connection settings.
 * x-ms-original-file: 2025-08-01/ReplicationVaultSetting_Get.json
 */
async function getsTheVaultSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationVaultSetting.get("resourceGroupPS1", "vault1", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheVaultSetting();
}

main().catch(console.error);
