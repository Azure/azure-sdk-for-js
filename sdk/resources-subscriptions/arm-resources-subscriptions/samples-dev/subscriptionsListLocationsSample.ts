// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionClient } from "@azure/arm-resources-subscriptions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 *
 * @summary this operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 * x-ms-original-file: 2022-12-01/GetLocations.json
 */
async function getLocationsWithASubscriptionId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptions.listLocations(
    "a1ffc958-d2c7-493e-9f1e-125a0477f536",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to this operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 *
 * @summary this operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 * x-ms-original-file: 2022-12-01/GetLocationsWithExtendedLocations.json
 */
async function getLocationsWithExtendedLocations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SubscriptionClient(credential);
  const resArray = new Array();
  for await (const item of client.subscriptions.listLocations(
    "a1ffc958-d2c7-493e-9f1e-125a0477f536",
    { includeExtendedLocations: true },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getLocationsWithASubscriptionId();
  await getLocationsWithExtendedLocations();
}

main().catch(console.error);
