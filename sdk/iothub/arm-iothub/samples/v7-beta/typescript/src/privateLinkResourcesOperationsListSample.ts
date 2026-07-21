// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubClient } from "@azure/arm-iothub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list private link resources for the given IotHub
 *
 * @summary list private link resources for the given IotHub
 * x-ms-original-file: 2026-03-01-preview/iothub_listprivatelinkresources.json
 */
async function privateLinkResourcesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "91d12660-3dec-467a-be2a-213b5544ddc0";
  const client = new IotHubClient(credential, subscriptionId);
  const result = await client.privateLinkResourcesOperations.list("myResourceGroup", "testHub");
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesList();
}

main().catch(console.error);
