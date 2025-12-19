// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a SecuritySetting
 *
 * @summary delete a SecuritySetting
 * x-ms-original-file: 2025-12-01-preview/DeleteSecuritySettings.json
 */
async function deleteSecuritySettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.securitySettings.delete("test-rg", "myCluster", "default");
}

async function main() {
  await deleteSecuritySettings();
}

main().catch(console.error);
