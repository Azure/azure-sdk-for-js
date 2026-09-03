// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SubscriptionClient } = require("@azure/arm-resources-subscriptions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 *
 * @summary this operation provides all the locations that are available for resource providers; however, each resource provider may support a subset of this list.
 * x-ms-original-file: 2022-12-01/GetLocations.json
 */
async function getLocationsWithASubscriptionId() {
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
async function getLocationsWithExtendedLocations() {
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

async function main() {
  await getLocationsWithASubscriptionId();
  await getLocationsWithExtendedLocations();
}

main().catch(console.error);
