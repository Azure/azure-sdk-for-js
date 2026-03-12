// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List operation gets information about the vaults associated with the subscription and within the specified resource group.
 *
 * @summary The List operation gets information about the vaults associated with the subscription and within the specified resource group.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listVaultByResourceGroup.json
 */

import type { VaultsListByResourceGroupOptionalParams } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { KeyVaultManagementClient } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listVaultsInTheSpecifiedResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const top = 1;
  const options: VaultsListByResourceGroupOptionalParams = { top };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.listByResourceGroup(resourceGroupName, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listVaultsInTheSpecifiedResourceGroup();
}

main().catch(console.error);
