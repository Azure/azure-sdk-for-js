// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: 2026-04-01/BlobContainersList.json
 */
async function listContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobContainers.list("res9290", "sto1590")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 *
 * @summary lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.
 * x-ms-original-file: 2026-04-01/DeletedBlobContainersList.json
 */
async function listDeletedContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.blobContainers.list("res9290", "sto1590", {
    include: "deleted",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listContainers();
  await listDeletedContainers();
}

main().catch(console.error);
