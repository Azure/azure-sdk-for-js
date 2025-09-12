// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Endpoint resource.
 *
 * @summary deletes an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Delete.json
 */
async function endpointsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  await client.endpoints.delete(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
}

async function main(): Promise<void> {
  await endpointsDelete();
}

main().catch(console.error);
