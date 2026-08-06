// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AIManager resources by resource group
 *
 * @summary list AIManager resources by resource group
 * x-ms-original-file: 2026-05-02-preview/AIManagers_ListByResourceGroup.json
 */
async function listsAIManagerResourcesByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.aiManagers.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAIManagerResourcesByResourceGroup();
}

main().catch(console.error);
