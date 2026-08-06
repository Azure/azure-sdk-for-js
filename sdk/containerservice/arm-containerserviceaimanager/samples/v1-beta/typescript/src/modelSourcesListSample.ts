// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ModelSource resources by AIManager
 *
 * @summary list ModelSource resources by AIManager
 * x-ms-original-file: 2026-05-02-preview/ModelSources_List.json
 */
async function modelSourcesListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.modelSources.list("rgaimanagers", "aimanager1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await modelSourcesListMaximumSet();
}

main().catch(console.error);
