// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the NGINX configuration for given NGINX deployment
 *
 * @summary create or update the NGINX configuration for given NGINX deployment
 * x-ms-original-file: 2025-03-01-preview/Configurations_CreateOrUpdate.json
 */
async function configurationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.configurations.createOrUpdate(
    "myResourceGroup",
    "myDeployment",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationsCreateOrUpdate();
}

main().catch(console.error);
