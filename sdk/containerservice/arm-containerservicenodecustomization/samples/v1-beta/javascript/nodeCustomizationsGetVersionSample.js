// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a node customization at a particular version.
 *
 * @summary get a node customization at a particular version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_GetVersion.json
 */
async function nodeCustomizationsGetVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.nodeCustomizations.getVersion(
    "rg1",
    "my-node-customization",
    "20250101-abcd1234",
  );
  console.log(result);
}

async function main() {
  await nodeCustomizationsGetVersion();
}

main().catch(console.error);
