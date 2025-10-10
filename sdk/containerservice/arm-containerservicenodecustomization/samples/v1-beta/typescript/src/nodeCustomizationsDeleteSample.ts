// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a node customization. This operation will be blocked if the resource is in use.
 *
 * @summary delete a node customization. This operation will be blocked if the resource is in use.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Delete.json
 */
async function nodeCustomizationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.nodeCustomizations.delete("rg1", "my-node-customization");
}

async function main(): Promise<void> {
  await nodeCustomizationsDelete();
}

main().catch(console.error);
