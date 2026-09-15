// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deprecated: List the node customizations in a resource group at the latest version. Use Prepared Image Specification APIs instead.
 *
 * @summary deprecated: List the node customizations in a resource group at the latest version. Use Prepared Image Specification APIs instead.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListByResourceGroup.json
 */
async function nodeCustomizationsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeCustomizations.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nodeCustomizationsListByResourceGroup();
}

main().catch(console.error);
