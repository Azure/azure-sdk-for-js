// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-sku");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: 2021-07-01/skus/ListAvailableResourceSkus.json
 */
async function listsAllAvailableResourceSKUs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: 2021-07-01/skus/ListAvailableResourceSkusForARegion.json
 */
async function listsAllAvailableResourceSKUsForTheSpecifiedRegion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list({
    filter: "location eq 'westus'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets the list of Microsoft.Compute SKUs available for your Subscription.
 *
 * @summary gets the list of Microsoft.Compute SKUs available for your Subscription.
 * x-ms-original-file: 2021-07-01/skus/ListAvailableResourceSkusWithExtendedLocations.json
 */
async function listsAllAvailableResourceSKUsWithExtendedLocationInformation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceSkus.list({
    includeExtendedLocations: "true",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllAvailableResourceSKUs();
  await listsAllAvailableResourceSKUsForTheSpecifiedRegion();
  await listsAllAvailableResourceSKUsWithExtendedLocationInformation();
}

main().catch(console.error);
