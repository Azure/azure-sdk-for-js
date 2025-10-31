// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all versions of a node customization.
 *
 * @summary list all versions of a node customization.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListVersions.json
 */
async function nodeCustomizationsListVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeCustomizations.listVersions("rg1", "my-node-customization")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nodeCustomizationsListVersions();
}

main().catch(console.error);
