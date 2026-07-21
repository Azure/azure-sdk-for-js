// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Dev Box definitions for a devcenter.
 *
 * @summary list Dev Box definitions for a devcenter.
 * x-ms-original-file: 2026-01-01-preview/DevBoxDefinitions_ListByDevCenter.json
 */
async function devBoxDefinitionsListByDevCenter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devBoxDefinitions.listByDevCenter("rg1", "Contoso")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await devBoxDefinitionsListByDevCenter();
}

main().catch(console.error);
