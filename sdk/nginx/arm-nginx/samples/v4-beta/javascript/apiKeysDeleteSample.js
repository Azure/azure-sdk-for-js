// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete API key for Nginx deployment
 *
 * @summary delete API key for Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/ApiKeys_Delete.json
 */
async function apiKeysDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  await client.apiKeys.delete("myResourceGroup", "myDeployment", "myApiKey");
}

async function main() {
  await apiKeysDelete();
}

main().catch(console.error);
