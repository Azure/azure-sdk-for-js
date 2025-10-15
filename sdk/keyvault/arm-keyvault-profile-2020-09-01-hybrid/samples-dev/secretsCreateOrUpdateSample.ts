// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a secret in a key vault in the specified subscription.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
 *
 * @summary Create or update a secret in a key vault in the specified subscription.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.
 * x-ms-original-file: specification/keyvault/resource-manager/Microsoft.KeyVault/stable/2019-09-01/examples/createSecret.json
 */

import type { SecretCreateOrUpdateParameters } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { KeyVaultManagementClient } from "@azure/arm-keyvault-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createASecret(): Promise<void> {
  const subscriptionId =
    process.env["KEYVAULT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["KEYVAULT_RESOURCE_GROUP"] || "sample-group";
  const vaultName = "sample-vault";
  const secretName = "secret-name";
  const parameters: SecretCreateOrUpdateParameters = {
    properties: { value: "secret-value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.secrets.createOrUpdate(
    resourceGroupName,
    vaultName,
    secretName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createASecret();
}

main().catch(console.error);
