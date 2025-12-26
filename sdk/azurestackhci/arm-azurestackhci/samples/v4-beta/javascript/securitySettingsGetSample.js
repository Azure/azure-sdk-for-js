// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SecuritySetting
 *
 * @summary get a SecuritySetting
 * x-ms-original-file: 2025-12-01-preview/GetSecuritySettings.json
 */
async function getSecuritySettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.securitySettings.get("test-rg", "myCluster", "default");
  console.log(result);
}

async function main() {
  await getSecuritySettings();
}

main().catch(console.error);
