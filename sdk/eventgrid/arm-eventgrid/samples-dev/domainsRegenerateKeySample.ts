// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate a shared access key for a domain.
 *
 * @summary regenerate a shared access key for a domain.
 * x-ms-original-file: 2025-07-15-preview/Domains_RegenerateKey.json
 */
async function domainsRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domains.regenerateKey("examplerg", "exampledomain2", {
    keyName: "key1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await domainsRegenerateKey();
}

main().catch(console.error);
