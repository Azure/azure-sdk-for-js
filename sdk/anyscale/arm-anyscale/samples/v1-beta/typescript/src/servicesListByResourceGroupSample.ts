// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists services in a project.
 *
 * @summary lists services in a project.
 * x-ms-original-file: 2026-09-01/Services_ListByResourceGroup.json
 */
async function servicesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listByResourceGroup(
    "rganyscale",
    "testcloud",
    "testproject",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await servicesListByResourceGroup();
}

main().catch(console.error);
