// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a node customization version. This operation will be blocked if the node customization version is in use.
 *
 * @summary delete a node customization version. This operation will be blocked if the node customization version is in use.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_DeleteVersion.json
 */
async function nodeCustomizationsDeleteVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.nodeCustomizations.deleteVersion(
    "rg1",
    "my-node-customization",
    "20250101-abcd1234",
  );
}

async function main(): Promise<void> {
  await nodeCustomizationsDeleteVersion();
}

main().catch(console.error);
