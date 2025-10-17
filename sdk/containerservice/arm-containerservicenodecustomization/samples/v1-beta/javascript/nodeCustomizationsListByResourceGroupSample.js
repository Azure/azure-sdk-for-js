// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the node customizations in a resource group at the latest version.
 *
 * @summary list the node customizations in a resource group at the latest version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListByResourceGroup.json
 */
async function nodeCustomizationsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeCustomizations.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nodeCustomizationsListByResourceGroup();
}

main().catch(console.error);
