// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List operation gets information about the vaults associated with the subscription.
 *
 * @summary The List operation gets information about the vaults associated with the subscription.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/listVaultBySubscription.json
 */

import {
  VaultsListBySubscriptionOptionalParams,
  KeyVaultManagementClient,
} from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listVaultsInTheSpecifiedSubscription(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const top = 1;
  const options: VaultsListBySubscriptionOptionalParams = { top };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.listBySubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listVaultsInTheSpecifiedSubscription();
}

main().catch(console.error);
