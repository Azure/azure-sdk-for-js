// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the two keys used to publish to a domain.
 *
 * @summary list the two keys used to publish to a domain.
 * x-ms-original-file: 2025-07-15-preview/Domains_ListSharedAccessKeys.json
 */
async function domainsListSharedAccessKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domains.listSharedAccessKeys("examplerg", "exampledomain2");
  console.log(result);
}

async function main() {
  await domainsListSharedAccessKeys();
}

main().catch(console.error);
