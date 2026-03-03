// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for List all ResourceHealthMetadata for all sites in the subscription.
 *
 * @summary description for List all ResourceHealthMetadata for all sites in the subscription.
 * x-ms-original-file: 2025-05-01/ListResourceHealthMetadataBySubscription.json
 */
async function listResourceHealthMetadataForASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceHealthMetadata.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listResourceHealthMetadataForASubscription();
}

main().catch(console.error);
