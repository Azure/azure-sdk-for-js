// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list BuildResource resources by BuilderResource
 *
 * @summary list BuildResource resources by BuilderResource
 * x-ms-original-file: 2025-10-02-preview/Builds_ListByBuilderResource.json
 */
async function buildsListByBuilderResource0(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.buildsByBuilderResource.list("rg", "testBuilder")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await buildsListByBuilderResource0();
}

main().catch(console.error);
