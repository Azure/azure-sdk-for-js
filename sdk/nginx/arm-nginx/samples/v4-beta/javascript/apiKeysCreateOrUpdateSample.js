// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint
 *
 * @summary create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint
 * x-ms-original-file: 2025-03-01-preview/ApiKeys_CreateOrUpdate.json
 */
async function apiKeysCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.apiKeys.createOrUpdate("myResourceGroup", "myDeployment", "myApiKey");
  console.log(result);
}

async function main() {
  await apiKeysCreateOrUpdate();
}

main().catch(console.error);
