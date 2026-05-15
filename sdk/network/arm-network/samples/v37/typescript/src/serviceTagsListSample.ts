// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of service tag information resources.
 *
 * @summary gets a list of service tag information resources.
 * x-ms-original-file: 2025-05-01/ServiceTagsList.json
 */
async function getListOfServiceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceTags.list("westcentralus");
  console.log(result);
}

async function main(): Promise<void> {
  await getListOfServiceTags();
}

main().catch(console.error);
