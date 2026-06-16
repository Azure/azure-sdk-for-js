// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all resource providers for a subscription.
 *
 * @summary gets all resource providers for a subscription.
 * x-ms-original-file: 2025-04-01/GetProviders.json
 */
async function getProviders(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.providers.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getProviders();
}

main().catch(console.error);
