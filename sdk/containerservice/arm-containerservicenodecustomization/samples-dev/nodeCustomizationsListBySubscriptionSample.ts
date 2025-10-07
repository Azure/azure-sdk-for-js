// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservicenodecustomization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the node customizations in a subscription at the latest version.
 *
 * @summary list the node customizations in a subscription at the latest version.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_ListBySubscription.json
 */
async function nodeCustomizationsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodeCustomizations.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await nodeCustomizationsListBySubscription();
}

main().catch(console.error);
