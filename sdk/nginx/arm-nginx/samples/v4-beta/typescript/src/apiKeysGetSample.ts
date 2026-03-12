// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified API Key of the given Nginx deployment
 *
 * @summary get the specified API Key of the given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/ApiKeys_Get.json
 */
async function apiKeysGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.apiKeys.get("myResourceGroup", "myDeployment", "myApiKey");
  console.log(result);
}

async function main(): Promise<void> {
  await apiKeysGet();
}

main().catch(console.error);
