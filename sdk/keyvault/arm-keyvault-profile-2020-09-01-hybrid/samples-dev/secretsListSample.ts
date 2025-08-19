// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The List operation gets information about the secrets in a vault.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
 *
 * @summary The List operation gets information about the secrets in a vault.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/listSecrets.json
 */

import { KeyVaultManagementClient } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listSecretsInTheVault(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secrets.list(resourceGroupName, vaultName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecretsInTheVault();
}

main().catch(console.error);
