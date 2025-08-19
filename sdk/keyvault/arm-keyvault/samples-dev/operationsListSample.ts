// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the available Key Vault Rest API operations.
 *
 * @summary Lists all of the available Key Vault Rest API operations.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2024-11-01/examples/listOperations.json
 */

import { KeyVaultManagementClient } from "@azure/arm-keyvault";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAvailableRestApiOperations(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAvailableRestApiOperations();
}

main().catch(console.error);
