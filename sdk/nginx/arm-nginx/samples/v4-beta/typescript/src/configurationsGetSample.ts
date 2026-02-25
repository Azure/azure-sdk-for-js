// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the NGINX configuration of given NGINX deployment
 *
 * @summary get the NGINX configuration of given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Configurations_Get.json
 */
async function configurationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.configurations.get("myResourceGroup", "myDeployment", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await configurationsGet();
}

main().catch(console.error);
