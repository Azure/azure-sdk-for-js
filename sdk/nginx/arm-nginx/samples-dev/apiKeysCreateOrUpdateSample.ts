// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint
 *
 * @summary create or update an API Key for the Nginx deployment in order to access the dataplane API endpoint
 * x-ms-original-file: 2025-03-01-preview/ApiKeys_CreateOrUpdate.json
 */
async function apiKeysCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.apiKeys.createOrUpdate("myResourceGroup", "myDeployment", "myApiKey");
  console.log(result);
}

async function main(): Promise<void> {
  await apiKeysCreateOrUpdate();
}

main().catch(console.error);
