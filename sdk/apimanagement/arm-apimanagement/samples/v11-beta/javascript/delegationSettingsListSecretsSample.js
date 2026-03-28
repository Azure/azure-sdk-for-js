// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the secret validation key of the DelegationSettings.
 *
 * @summary gets the secret validation key of the DelegationSettings.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListSecretsPortalSettingsValidationKey.json
 */
async function apiManagementListSecretsPortalSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.delegationSettings.listSecrets("rg1", "apimService1");
  console.log(result);
}

async function main() {
  await apiManagementListSecretsPortalSettings();
}

main().catch(console.error);
