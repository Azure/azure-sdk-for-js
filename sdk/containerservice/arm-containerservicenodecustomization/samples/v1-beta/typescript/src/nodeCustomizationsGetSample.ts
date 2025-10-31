// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a node customization at the latest version.
 *
 * @summary get a node customization at the latest version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Get.json
 */
async function nodeCustomizationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.nodeCustomizations.get("rg1", "my-node-customization");
  console.log(result);
}

async function main(): Promise<void> {
  await nodeCustomizationsGet();
}

main().catch(console.error);
