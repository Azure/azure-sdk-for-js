// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretsStoreExtensionManagementClient } from "@azure/arm-secretsstoreextension";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the SecretSync instances within a resource group.
 *
 * @summary lists the SecretSync instances within a resource group.
 * x-ms-original-file: 2026-09-25-preview/SecretSyncs_ListByResourceGroup_MaximumSet_Gen.json
 */
async function secretSyncsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecretsStoreExtensionManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secretSyncs.listByResourceGroup("rg-ssc-example")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await secretSyncsListByResourceGroup();
}

main().catch(console.error);
