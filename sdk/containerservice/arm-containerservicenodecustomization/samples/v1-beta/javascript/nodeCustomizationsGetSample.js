// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a node customization at the latest version.
 *
 * @summary get a node customization at the latest version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Get.json
 */
async function nodeCustomizationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.nodeCustomizations.get("rg1", "my-node-customization");
  console.log(result);
}

async function main() {
  await nodeCustomizationsGet();
}

main().catch(console.error);
