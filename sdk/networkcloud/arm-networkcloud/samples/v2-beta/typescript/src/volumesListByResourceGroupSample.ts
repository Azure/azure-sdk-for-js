// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of volumes in the provided resource group.
 *
 * @summary get a list of volumes in the provided resource group.
 * x-ms-original-file: 2026-05-01-preview/Volumes_ListByResourceGroup.json
 */
async function listVolumesForResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.volumes.listByResourceGroup("resourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVolumesForResourceGroup();
}

main().catch(console.error);
