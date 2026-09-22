// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list environment definitions in the catalog.
 *
 * @summary list environment definitions in the catalog.
 * x-ms-original-file: 2026-01-01-preview/EnvironmentDefinitions_ListByCatalog.json
 */
async function environmentDefinitionsListByCatalog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.environmentDefinitions.listByCatalog(
    "rg1",
    "Contoso",
    "myCatalog",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await environmentDefinitionsListByCatalog();
}

main().catch(console.error);
