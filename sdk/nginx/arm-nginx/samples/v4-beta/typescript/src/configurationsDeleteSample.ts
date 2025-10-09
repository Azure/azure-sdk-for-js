// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reset the NGINX configuration of given NGINX deployment to default
 *
 * @summary reset the NGINX configuration of given NGINX deployment to default
 * x-ms-original-file: 2025-03-01-preview/Configurations_Delete.json
 */
async function configurationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  await client.configurations.delete("myResourceGroup", "myDeployment", "default");
}

async function main(): Promise<void> {
  await configurationsDelete();
}

main().catch(console.error);
