// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all API Keys of the given Nginx deployment
 *
 * @summary list all API Keys of the given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/ApiKeys_List.json
 */
async function apiKeysList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiKeys.list("myResourceGroup", "myDeployment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await apiKeysList();
}

main().catch(console.error);
