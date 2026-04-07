// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource by name which can be used for the Maps Account.
 *
 * @summary gets a private link resource by name which can be used for the Maps Account.
 * x-ms-original-file: 2025-10-01-preview/PrivateLinkResources_Get.json
 */
async function getAPrivateLinkResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "myResourceGroup",
    "myMapsAccount",
    "mapsAccount",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateLinkResource();
}

main().catch(console.error);
