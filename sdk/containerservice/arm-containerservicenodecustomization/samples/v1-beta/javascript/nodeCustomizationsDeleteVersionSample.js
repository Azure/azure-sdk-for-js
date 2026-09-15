// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deprecated: Delete a node customization version. This operation will be blocked if the node customization version is in use. Use Prepared Image Specification APIs instead.
 *
 * @summary deprecated: Delete a node customization version. This operation will be blocked if the node customization version is in use. Use Prepared Image Specification APIs instead.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_DeleteVersion.json
 */
async function nodeCustomizationsDeleteVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.nodeCustomizations.deleteVersion(
    "rg1",
    "my-node-customization",
    "20250101-abcd1234",
  );
}

async function main() {
  await nodeCustomizationsDeleteVersion();
}

main().catch(console.error);
