// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the node customizations in a subscription at the latest version.
 *
 * @summary list the node customizations in a subscription at the latest version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListBySubscription.json
 */
async function nodeCustomizationsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeCustomizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nodeCustomizationsListBySubscription();
}

main().catch(console.error);
